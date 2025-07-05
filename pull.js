const pLimit = require("p-limit").default;
const limit = pLimit(8);

const download = require("download");
const strftime = require("strftime");
const fs = require("fs");

const now = Math.floor(Date.now() / 1000);

(async function () {
    let packagesToPull = process.argv
        .slice(2)
        .filter((s) => !s.startsWith("-"));
    let pullAll = process.argv.includes("-A");

    if (packagesToPull.length == 0) {
        console.log("No packages specified, defaulting to -A");
        pullAll = true;
    }

    let force = process.argv.includes("-f");

    if (packagesToPull.length != 0 && pullAll) {
        console.error("Cannot specify packages to pull when -A is used.");
        process.exit(1);
    }

    let seeds = require("./seeds.json");

    for (let name in seeds) {
        if (typeof seeds[name] == "string") {
            let [format, ...content] = seeds[name].split(":");
            content = content.join(":");

            switch (format) {
                case "github":
                    seeds[name] = {
                        manifestURL: `https://raw.githubusercontent.com/${content}/refs/heads/master/package.json`,
                        releaseURL: `https://github.com/${content}/archive/refs/heads/master.zip`,
                        repoURL: `https://github.com/${content}`,
                    };
                    break;

                default:
                    throw new Error(`Unknown format: ${format}`);
            }
        }
    }

    if (pullAll) {
        packagesToPull = Object.keys(seeds);
    } else {
        packagesToPull = packagesToPull.filter(
            (name) => packagesToPull[name] !== undefined,
        );
    }

    let masterIndex;
    if (fs.existsSync("./index.json")) {
        masterIndex = require("./index.json");
    } else {
        masterIndex = {};
    }

    let pulledManifests = {};

    let manifestRequests = packagesToPull.map((name) =>
        limit(() => fetch(seeds[name].manifestURL)),
    );
    let manifestJSONs = await Promise.all(manifestRequests);

    for (let i = 0; i < manifestJSONs.length; i++) {
        let manifestRes = manifestJSONs[i];
        let packageName = packagesToPull[i];

        try {
            let res = await manifestRes.json();

            if (packageName !== res.name) {
                console.error(`Seed "${packageName}" failed test: same name`);
                return;
            }

            if (res.author === undefined) {
                console.error(
                    `Seed "${packageName}" failed test: author defined`,
                );
                return;
            }

            if (res.repository === undefined) {
                console.error(
                    `Seed "${packageName}" failed test: repository defined`,
                );
                return;
            }

            if (
                !force &&
                fs.existsSync(`./packages/${packageName}/package.json`)
            ) {
                let currentManifest = require(
                    `./packages/${packageName}/package.json`,
                );
                let currentVersion = currentManifest.version
                    .split(".")
                    .map(parseInt);
                let newVersion = res.version.split(".").map(parseInt);

                if (newVersion <= currentVersion) {
                    if (!pullAll)
                        console.error(
                            `Seed "${packageName}" failed test: ${currentManifest.version} is not newer than ${res.version}`,
                        );
                    continue;
                }
            }

            pulledManifests[packageName] = res;
        } catch (error) {
            console.log("An error occured when pulling " + packageName);
            console.error(error);
        }
    }

    packagesToPull = Object.keys(pulledManifests);
    if (fs.existsSync("./pulling")) {
        fs.rmSync("./pulling", { recursive: true, force: true });
    }

    fs.mkdirSync("./pulling");

    let downloadRequests = packagesToPull.map((name) =>
        limit(async () =>
            fs.writeFileSync(
                `./pulling/${name}.zip`,
                await download(seeds[name].releaseURL),
            ),
        ),
    );

    await Promise.all(downloadRequests);

    for (let name of packagesToPull) {
        console.log(`Pulled ${name}`);
        fs.mkdirSync(`./packages/${name}/releases/`, { recursive: true });
        fs.renameSync(
            `./pulling/${name}.zip`,
            `./packages/${name}/releases/${pulledManifests[name].version}.zip`,
        );
        fs.writeFileSync(
            `./packages/${name}/releases/${pulledManifests[name].version}.json`,
            JSON.stringify(pulledManifests[name], null, 2),
        );
        fs.writeFileSync(
            `./packages/${name}/package.json`,
            JSON.stringify(pulledManifests[name], null, 2),
        );

        let versionsJSON;

        if (fs.existsSync(`./packages/${name}/versions.json`)) {
            versionsJSON = require(`./packages/${name}/versions.json`);
        } else {
            versionsJSON = { versions: [] };
        }

        versionsJSON.versions = versionsJSON.versions.filter(
            ({ label, _ }) => label != pulledManifests[name].version,
        );

        versionsJSON.versions.push({
            label: pulledManifests[name].version,
            updated: now,
        });
        versionsJSON.versions.sort((a, b) =>
            a.label.split(".").map(parseInt) < b.label.split(".").map(parseInt)
                ? 1
                : -1,
        );

        fs.writeFileSync(
            `./packages/${name}/versions.json`,
            JSON.stringify(versionsJSON, null, 2),
        );

        masterIndex[name] = {
            version: pulledManifests[name].version,
            updated: now,
            description: pulledManifests[name].description,
        };

        let readme = "# " + name + "\n\n";

        readme += pulledManifests[name].description + "\n\n";

        if (Object.keys(pulledManifests[name].dependencies).length != 0) {
            readme += "### Dependencies" + "\n\n";
            readme += "|Package|Version|" + "\n";
            readme += "|---|---|" + "\n";
            readme +=
                Object.entries(pulledManifests[name].dependencies)
                    .map(
                        ([name, version]) =>
                            `|${seeds[name] ? `[${name}](../${name})` : name}|${version}|\n`,
                    )
                    .join("\n") + "\n";
        }

        readme +=
            `// Seed info: [Repository](${seeds[name].repoURL}) | [Manifest](${seeds[name].manifestURL}) | [Release](${seeds[name].releaseURL})` +
            "\n\n";

        readme += "## All Versions" + "\n\n";
        readme += "|Version|Updated|Download|" + "\n";
        readme += "|---|---|---|" + "\n";

        readme += versionsJSON.versions
            .map(({ label, updated }) => {
                updated = strftime("%D - %H:%M", new Date(updated * 1000));
                return `|${label}|${updated}|[${label}.zip](./releases/${label}.zip)|`;
            })
            .join("\n");

        fs.writeFileSync(`./packages/${name}/README.md`, readme);
    }

    fs.rmSync("./pulling", { recursive: true, force: true });
    fs.writeFileSync(`./index.json`, JSON.stringify(masterIndex, null, 2));

    let readme = fs.readFileSync("./README.md", "utf8");

    let [before, notbefore] = readme.split("<!--begin:packages-->\n");
    let [_, after] = notbefore.split("\n<!--end:packages-->");

    masterIndex = Object.entries(masterIndex);
    masterIndex.sort(([a, _a], [b, _b]) =>
        a.toLowerCase().localeCompare(b.toLowerCase()),
    );

    let packagesContent = "|Package|Version|Updated|Description|\n";
    packagesContent += "|---|---|---|---|\n";
    packagesContent += masterIndex
        .map(
            ([name, { updated, version, description }]) =>
                `|[${name}](./packages/${name})|${version}|${strftime("%D - %H:%M", new Date(updated * 1000))}|${description}|`,
        )
        .join("\n");

    fs.writeFileSync(
        "./README.md",
        `${before}<!--begin:packages-->\n${packagesContent}\n<!--end:packages-->${after}`,
    );
})();

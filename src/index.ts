import glob from "glob-promise";
import fs from "fs";

import { ProjectSet } from "./projectSet";

(async function run() {
  const files = await glob("sets/*.json");
  await Promise.all(files.map(async (file) => {
    const rawContents = await fs.promises.readFile(file, 'utf8');
    const projectSet = ProjectSet.fromPojo(JSON.parse(rawContents));
    const amount = projectSet.reimbursement().amount();
    console.log(
      `Project ${file} reimbursement: $${amount}`,
    );
  }));
})();

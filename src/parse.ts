import type { JsonFragment } from "@ethersproject/abi";
import { Interface } from "@ethersproject/abi";
import * as fs from "fs/promises";

const inputDir = "../web3-template/src/abis/";
const outputDir = "../web3-template/src/abis-new/";

export const parse = async (): Promise<void> => {
  const files = await fs.readdir(inputDir);

  for (const f of files) {
    try {
      const rawFile = await fs.readFile(inputDir + f);

      const jsonFile = JSON.parse(rawFile.toString()) as
        | Interface
        | { abi: Interface };
      const abi = jsonFile instanceof Interface ? jsonFile : jsonFile.abi;

      const frags = JSON.parse(JSON.stringify(abi)) as JsonFragment[];

      const out = frags.map((m) => {
        const { gas, ...rest } = m;
        return { gas: gas?.toString(), ...rest };
      });

      await fs.writeFile(outputDir + f, JSON.stringify(out, null, 2));
    } catch (err) {
      console.error("Error in " + f);
      throw err;
    }
  }
};

parse().catch((err) => {
  console.error(err);
});

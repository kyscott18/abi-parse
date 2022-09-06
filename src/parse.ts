import type { JsonFragment } from "@ethersproject/abi";
import { Interface } from "@ethersproject/abi";
import * as fs from "fs/promises";

export const parse = async (): Promise<void> => {
  const rawFile = await fs.readFile("abis/LiquidityGaugeV3.json");

  const jsonFile = JSON.parse(rawFile.toString()) as
    | Interface
    | { abi: Interface };

  const abi = jsonFile instanceof Interface ? jsonFile : jsonFile.abi;

  const f = JSON.parse(JSON.stringify(abi)) as JsonFragment[];

  const out = f.map((m) => {
    const { gas, ...rest } = m;
    return { gas: gas?.toString(), rest };
  });

  await fs.writeFile(
    "output/LiquidityGaugeV3.json",
    JSON.stringify(out, null, 2)
  );
};

parse().catch((err) => {
  console.error(err);
});

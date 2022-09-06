import * as fs from "fs/promises";

export const parse = async (): Promise<void> => {
  // const rawFile = await fs.readFile("data/rebases.json");

  // const rebases: Rebase[] = JSON.parse(rawFile.toString()) as Rebase[];

  await fs.writeFile("data/pools.json", JSON.stringify(0, null, 2));

  console.log(`Discovered and wrote ${0} pools`);
};

parse().catch((err) => {
  console.error(err);
});

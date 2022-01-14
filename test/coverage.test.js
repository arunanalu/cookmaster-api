const { promisify } = require('util');
const { readFile } = require("fs").promises;
const { resolve } = require("path");

const exec = promisify(require('child_process').exec);

let testResults;

const executeDevTests = async () => {
  await exec(`npm run dev:test:coverage:json &> /dev/null`)
      .catch(() => true);
    
  await new Promise(res => setTimeout(()=> res(true), 10000));
  
  const path = resolve("coverage", "coverage-summary.json");
  
  try {
    const lines = await readFile(path, "utf-8")
      .then((coverageTxt) => JSON.parse(coverageTxt))
      .then(({ total: { lines } }) => lines );

    testResults = {
      path,
      lines,
    };
  } catch (error) {
    console.error(`Não foi possível executar/ler o teste cobertura\n\n${error}\n\nTentando novamente...\n`);
    return executeDevTests();
  }
}

beforeAll(async () =>{
  await exec('rm -rf coverage .nyc_output').catch(()=> true);
  
  await executeDevTests();
});

afterAll(async () => {
  await exec('rm -rf coverage .nyc_output').catch(()=> true);
});

describe
  .each([
    [11,30,50], 
    [13,60,100],
    [14,90,150]
  ])
  (
    '%p - Crie testes de integração que cubram no mínimo %p porcento dos arquivos em src com um mínimo de %p linhas cobertas', 
    (_testId, percentage, coveredLines) => {
      it(
        'Será validado que o teste cobre o valor esperado',
        () =>{
          expect(testResults.lines.skipped).toStrictEqual(0);
          expect(testResults.lines.pct).toBeGreaterThanOrEqual(percentage);
          expect(testResults.lines.covered).toBeGreaterThanOrEqual(coveredLines);
        }
      )
    }
  );

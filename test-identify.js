const { getCompositions } = require('@remotion/renderer');

(async () => {
    try {
        const comps = await getCompositions('./src/index.ts');
        console.log(JSON.stringify(comps.map(c => ({ id: c.id, transparent: c.id.includes('transparent') }))));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

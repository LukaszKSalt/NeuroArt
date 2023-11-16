const createOption = (value: string, label: string) => ({ value, label });

export const lightingOptions = [
    createOption('', 'Select Lighting'),
    createOption('cinematic', 'Cinematic'),
    createOption('dappled', 'Dappled'),
    createOption('bright', 'Bright'),
    createOption('ambient', 'Ambient'),
    createOption('flat', 'Flat'),
    createOption('volumetric', 'Volumetric'),
    createOption('backlit', 'Backlit'),
    createOption('moody', 'Moody'),
    createOption('silhouette', 'Silhouette'),
    createOption('spotlight', 'Spotlight'),
    createOption('soft', 'Soft'),
    createOption('nighttime', 'Nighttime'),
];

export const styleOptions = [
    createOption('', 'Select Style'),
    createOption('hyperrealistic', 'Hyperrealistic'),
    createOption('oil-painting', 'Oil Painting'),
    createOption('watercolor-lighting', 'Watercolor Lighting'),
    createOption('graffiti-style', 'Graffiti Style'),
    createOption('3d-render', '3D Render'),
    createOption('surrealism', 'Surrealism'),
    createOption('impressionism', 'Impressionism'),
    createOption('japanese-anime', 'Japanese Anime'),
    createOption('pop-art-style', 'Pop Art Style'),
    createOption('grunge-style', 'Grunge Style'),
    createOption('cyberpunk', 'Cyberpunk'),
    createOption('renaissance', 'Renaissance'),
    createOption('pointillism', 'Pointillism'),
    createOption('realism', 'Realism'),
    createOption('sketch', 'Sketch'),
];

export const colorOptions = [
    createOption('', 'Select Colors'),
    createOption('retro', 'Retro'),
    createOption('vivid', 'Vivid'),
    createOption('pastel', 'Pastel'),
    createOption('neon', 'Neon'),
    createOption('earthy', 'Earthy'),
    createOption('primary', 'Primary'),
    createOption('monochromatic', 'Monochromatic'),
    createOption('jewel-tones', 'Jewel Tones'),
    createOption('cool-tones', 'Cool Tones'),
    createOption('warm-tones', 'Warm Tones'),
    createOption('metallic', 'Metallic'),
    createOption('gradient', 'Gradient'),
    createOption('black-and-white', 'Black and White'),
];

export const landscapeOptions = [
    createOption('', 'Select Landscape'),
    createOption('surreal', 'Surreal'),
    createOption('unreal', 'Unreal'),
    createOption('fantasy', 'Fantasy'),
    createOption('sci-fi', 'Sci-fi'),
    createOption('desert', 'Desert'),
    createOption('tropical', 'Tropical'),
    createOption('rainforest', 'Rainforest'),
    createOption('mountain-range', 'Mountain Range'),
    createOption('cityscape', 'Cityscape'),
    createOption('underwater', 'Underwater'),
    createOption('space', 'Space'),
    createOption('arctic', 'Arctic'),
    createOption('volcanic', 'Volcanic'),
    createOption('industrial', 'Industrial'),
];

export const textureOptions = [
    createOption('', 'Select Texture'),
    createOption('grainy texture', 'Grainy'),
    createOption('metallic texture', 'Metallic'),
    createOption('marble texture', 'Marble'),
    createOption('wood texture', 'Wood'),
    createOption('fabric texture', 'Fabric'),
    createOption('concrete texture', 'Concrete'),
    createOption('brick texture', 'Brick'),
    createOption('glass texture', 'Glass'),
    createOption('water texture', 'Water'),
];

export const shapeOptions = [
    createOption('', 'Select Shape'),
    createOption('geometric shapes', 'Geometric'),
    createOption('organic shapes', 'Organic'),
    createOption('abstract shapes', 'Abstract'),
    createOption('circular shapes', 'Circular'),
    createOption('square shapes', 'Square'),
    createOption('triangular shapes', 'Triangular'),
    createOption('rectangular shapes', 'Rectangular'),
    createOption('line drawings', 'Line Drawings'),
];

export const moodOptions = [
    createOption('', 'Select Mood'),
    createOption('upbeat mood', 'Upbeat'),
    createOption('relaxing mood', 'Relaxing'),
    createOption('romantic mood', 'Romantic'),
    createOption('mysterious mood', 'Mysterious'),
    createOption('dramatic mood', 'Dramatic'),
    createOption('comical mood', 'Comical'),
    createOption('eerie mood', 'Eerie'),
    createOption('adventurous mood', 'Adventurous'),
];

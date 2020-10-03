const Canvas = require('canvas');
const Colors = require('nice-color-palettes');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
	let height = options && options.height ? options.height : 506;
    let colors = options && options.colors ? options.colors : shuffle(Colors[Math.floor(Math.random() * Colors.length)].map(color => color.substring(1)));

    let canvas = Canvas.createCanvas(width, height);
	let ctx = canvas.getContext('2d');

    ctx.lineWidth = Math.floor(Math.random() * 4) + 1;
    ctx.fillStyle = `#${colors[0]}`;
    ctx.strokeStyle = `#${colors[1]}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cells_across = Math.floor(Math.random() * 100) + 50;  // Number of cells horizontally in the grid
    const cell_scale = width / cells_across; // Size of each cell
    const cells_down = height / cell_scale; // Number of cells vertically in the grid

    const rule = get_rule(Math.floor(Math.random() * 255)); // The rule to display

    function get_bit(num, pos){
        return (num >> pos) & 1;
    }

    // Combines 3 bits into an integer between 0 and 7
    function combine(b1, b2, b3){
        return (b1 << 2) + (b2 << 1) + (b3 << 0);
    }

    // Returns given number in the form of a tertiary function (a rule)
    function get_rule(num){
        return (b1, b2, b3) => get_bit(num, combine(b1, b2, b3));
    }

    function draw_rule(ctx, rule, scale, width, height) {
        let row = random_initial_row(width);
        for (let i = 0; i < height; i++) {
            draw_row(ctx, row, scale);
            row = next_row(row, rule);
        }
    }

    function draw_row(ctx, row, scale) {
        ctx.save();
        row.forEach(cell => {
            ctx.fillStyle = cell === 1 ?  '#' + colors[0] : '#' + colors[1];
            ctx.fillRect(0, 0, scale, scale);
            ctx.translate(scale, 0);
        });
        ctx.restore();
        ctx.translate(0, scale);
    }

    function next_row(old, rule) {
        return old.map((_, i) => rule(old[i - 1], old[i], old[i + 1]));
    }

    function random_initial_row(width) {
        return Array.from(Array(width), _ => Math.floor(Math.random() * 2));
    }


    draw_rule(ctx, rule, cell_scale, cells_across, cells_down);


    return canvas.toBuffer();

}
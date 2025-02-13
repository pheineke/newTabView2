function getPosition(i, { x, y, z }) {
    var x = x || 0;
    var y = y || 0;
    var z = z || 0;

    const grain = 0.1;

    var i = i * grain;

    var strength = Math.abs(
        Math.sqrt(
            Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
        )
    ) * 0.001

    z += Math.random();
    x += Math.random();

    z -= z * strength;
    x -= x * strength;

    console.log('Strength ' + strength);

    return {x, y, z}
}
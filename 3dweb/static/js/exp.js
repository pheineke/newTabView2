function getPosition(i, { x, y, z }) {
    var x = x || 0;
    var y = y || 0;
    var z = z || 0;

    const grain = 0.1;

    var i = i * grain;


    const wandering_scale = 5;

    var strength = Math.abs(
        Math.sqrt(
            Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
        )
    )

    var dz = Math.random() * wandering_scale;
    var dx = Math.random() * wandering_scale;

    var strength1 = (Math.random() * strength)

    console.log('Strength ' + strength);


    return {x, y, z}
}
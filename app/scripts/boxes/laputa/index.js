var imports = {
    cylinder: require('./parts/cylinder'),
    teeth: require('./parts/teeth'),
    body: require('./parts/body')
};

module.exports = function(){

    return {
        cylinder: imports.cylinder(),
        teeth: imports.teeth(),
        parts: [imports.body()],
        options: {
            width: 400,
            height: 200
        }
    };

};

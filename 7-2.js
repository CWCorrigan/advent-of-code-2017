const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    let input = data.trim();
    const bases = {};
    input.split('\n').forEach((line) => {
        const parts = line.split(' -> ');
        const disk = parts[0].split(' ');
        const name = disk[0].trim();
        bases[name] = {
            value: Number(disk[1].substr(1, disk[1].indexOf(')') - 1)),
            children: [],
            total: 0,
        };
        if(parts.length > 1) {
            bases[name].children = parts[1].split(',').map((x) => x.trim());
        }
    });

    const root = getRoot(bases);
    sumWeights(root, bases);
    console.log(balance(root, bases));
});

function getRoot(bases) {
    const keys = new Set(Object.keys(bases));
    for(const key in bases) {
        for(const i in bases[key].children) {
            keys.delete(bases[key].children[i]);
        }
    }

    return keys.values().next().value;
}

function sumWeights(root, tree) {
    tree[root].total = tree[root].value;
    tree[root].children.forEach((c) => {
        tree[root].total += sumWeights(c, tree);
    });

    return tree[root].total;
}

function balance(root, tree, target) {
    const children = {};
    var newTarget;
    tree[root].children.forEach((c) => {
        if(children[tree[c].total] === undefined) {
            children[tree[c].total] = c;
        } else {
            children[tree[c].total] = false;
            newTarget = tree[c].total;
        }
    });
    for(const i in children) {
        if(children[i]) {
            return balance(children[i], tree, newTarget);
        }
    }

    return tree[root].value + target - tree[root].total;
}
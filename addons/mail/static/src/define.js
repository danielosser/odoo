/** @odoo-module **/

let nextDefId = 0;
const store = {
    defs: {},
    items: {},
};

export function Define(o1, ...o2) {
    const id = nextDefId;
    step00(id, o1, o2);
    step01(id);
    step02(id);
    step03(id);
    step04(id);
    step05(id);
    step11(id);
    step12(id);
    step13(id);
    step14(id);
    // step15(id);
    window['aku/store'] = store;
    nextDefId++;
}

// store raw data in o1/o2
function step00(id, o1, o2) {
    store.defs[id] = {
        id,
        o1,
        o2,
    };
}

// char + char codes of each item in t1
function step01(id) {
    store.defs[id].t1 = (
        [
            ...store.defs[id]
            .o1[0]
        ]
        .map(
            char => ({
                char,
                code: char.charCodeAt(0),
            }),
        )
    );
}

// line split per definition
function step02(id) {
    store.defs[id].t2 = (
        store
        .defs[id]
        .o1[0]
        .split('\n')
    );
}

// line split per definition + level + relevant part
function step03(id) {
    store.defs[id].t3 = (
        store
        .defs[id]
        .t2
        .map(
            line => {
                const lineLength = line.length;
                let i = 0;
                while (i < lineLength && line.charCodeAt(i) === 32) {
                    i++;
                }
                return {
                    level: i,
                    oRelevantPart: line.substring(i),
                };
            }
        )
    );
}

// determine which type of line is something
function step04(id) {
    store.defs[id].t4 = (
        store
        .defs[id]
        .t3
        .map(
            ({ level, oRelevantPart }) => {

                function determineType() {
                    if (oRelevantPart[0] === '{' && oRelevantPart[oRelevantPart.length - 1] === '}') {
                        return 'call 1';
                    }
                    if (oRelevantPart[0] === '.' && oRelevantPart[1] === '{' && oRelevantPart[oRelevantPart.length - 1] === '}') {
                        return 'call 2';
                    }
                    if (oRelevantPart[0] === '[' && oRelevantPart[oRelevantPart.length - 1] === ']') {
                        return 'entry';
                    }
                    if (oRelevantPart[0] === ':') {
                        return 'set';
                    }
                    if (oRelevantPart[0] === '@') {
                        return 'read';
                    }
                    if (oRelevantPart.length > 0) {
                        return 'text'
                    }
                    return 'ignore'
                }

                const type = determineType();
                return {
                    level,
                    oRelevantPart,
                    type,
                };
            }
        )
    );
}

// identify items in defs
function step05(id) {
    let index = 0;
    store.defs[id].t5 = (
        store
        .defs[id]
        .t4
        .map(
            ({ level, oRelevantPart, type }) => {
                let currentIndex = index;
                index++;
                return {
                    def: id,
                    id: id + '_' + currentIndex,
                    index: currentIndex,
                    level,
                    oRelevantPart,
                    type,
                }
            }
        )
    );
}

// make items from previous processing in defs
function step11(id) {
    for (const { def, id: itemId, index, level, oRelevantPart, type } of store.defs[id].t5) {
        store.items[itemId] = {
            t1: {
                def,
                id: itemId,
                index,
                level,
                oNext: (
                    (index === store.defs[def].t5.length - 1)
                    ? undefined
                    : (def + '_' + (index + 1))
                ),
                oPrev: (
                    (index === 0)
                    ? undefined
                    : (def + '_' + (index - 1))
                ),
                oRelevantPart,
                type,
            }
        }
    }
}

// determine elements/isElementOf of items
function step12(id) {
    for (const { id: itemId } of store.defs[id].t5) {
        const item = store.items[itemId].t1;
        let isElementOf = undefined;
        let prevItem = store.items[item.oPrev]
        while (prevItem && !isElementOf) {
            if (prevItem.t1.level < item.level) {
                isElementOf = prevItem.t1.id;
            }
            prevItem = store.items[prevItem.t1.oPrev];
        }
        store.items[itemId].t2 = {
            ...store.items[itemId].t1,
            ...store.items[itemId].t2,
            isElementOf,
            elements: (
                (store.items[itemId].t2)
                ? [...store.items[itemId].t2.elements]
                : []
            ),
        }
        if (isElementOf) {
            store.items[isElementOf].t2 = {
                ...store.items[isElementOf].t1,
                ...store.items[isElementOf].t2,
                elements: (
                    (store.items[isElementOf].t2)
                    ? [...store.items[isElementOf].t2.elements, itemId]
                    : [itemId]
                ),
            }
        }
    }
}

// determine prev/next of items (sibling only)
function step13(id) {
    for (const { id: itemId } of store.defs[id].t5) {
        const item = store.items[itemId].t2;
        let prev = undefined
        let prevItem = store.items[item.oPrev];
        while (prevItem && !prev) {
            if (prevItem.t2.level === item.level) {
                prev = prevItem.t2.id;
            }
            if (prevItem.t2.level < item.level) {
                break;
            }
            prevItem = store.items[prevItem.t2.oPrev];
        }
        let next = undefined;
        let nextItem = store.items[item.oNext];
        while (nextItem && !next) {
            if (nextItem.t2.level === item.level) {
                next = nextItem.t2.id;
            }
            if (nextItem.t2.level < item.level) {
                break;
            }
            nextItem = store.items[nextItem.t2.oNext];
        }
        store.items[itemId].t3 = {
            ...store.items[itemId].t2,
            next,
            prev,
        }
    }
}

// determine relevant value of each item type
function step14(id) {
    for (const { id: itemId } of store.defs[id].t5) {
        const item = store.items[itemId].t3;
        let val = undefined;
        switch (item.type) {
            case 'call 1': {
                val = item.oRelevantPart.substring(1, item.oRelevantPart.length - 1);
                break;
            }
            case 'call 2': {
                val = item.oRelevantPart.substring(2, item.oRelevantPart.length - 1);
                break;
            }
            case 'entry': {
                val = item.oRelevantPart.substring(1, item.oRelevantPart.length - 1);
                break;
            }
            case 'set': {
                val = item.oRelevantPart.substring(1, item.oRelevantPart.length);
                break;
            }
            case 'read': {
                val = item.oRelevantPart.substring(1, item.oRelevantPart.length);
                break;
            }
            case 'text': {
                val = item.oRelevantPart;
                break;
            }
        }
        store.items[itemId].t4 = {
            ...store.items[itemId].t3,
            val,
        }
    }
}

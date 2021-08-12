const registry = {},
    actionHistory = [];

const runAllHistory = () => {
    actionHistory.forEach(action => action.render());
};
export default {
    registry: (type, component) => {
        registry[type] = component;
    },
    createNewAction: (ctx, type, data) => {
        const component = registry[type];
        if (!component) {
            throw new Error(`Component type ${type} is not registered.`);
        }
        return new component(ctx, type, data);
    },
    addAction: action => {
        actionHistory.push(action);
    },
    undo: () => {
        if (actionHistory.length) {
            console.log(actionHistory);
            actionHistory.pop();
            runAllHistory();
        }
    },
    existHistory: () => {
        return actionHistory.length > 0;
    },
};

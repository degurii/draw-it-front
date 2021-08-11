const registry = {},
    actionHistory = [];

export default {
    registry: (type, component) => {
        registry[type] = component;
    },
    makeNewAction: (ctx, type, data) => {
        return new registry[type](ctx, type, data);
    },
    addAction: action => {
        actionHistory.push(action);
    },
    undo: () => {
        actionHistory.pop();
        this.runAll();
    },
    runAll: () => {
        actionHistory.forEach(action => action.render());
    }
}
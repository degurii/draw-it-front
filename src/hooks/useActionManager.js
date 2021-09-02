import { useState, useEffect } from 'react';

export default () => {
    const [registry, setRegistry] = useState({});
    const [actionHistory, setActionHistory] = useState([]);
    const [removedHistory, setRemovedHistory] = useState([]);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    useEffect(() => {
        setCanUndo(actionHistory.length > 0);
    }, [actionHistory]);

    useEffect(() => {
        setCanRedo(removedHistory.length > 0);
    }, [removedHistory]);

    const rerender = () => actionHistory.forEach(action => action.render());

    return [
        canUndo,
        canRedo,
        {
            registry: (type, component) => {
                setRegistry(prev => ({
                    ...prev,
                    [type]: component,
                }));
            },
            createAction: (type, thickness, color, data = null) => {
                const component = registry[type];
                if (!component) {
                    throw new Error(
                        `Component type ${type} is not registered.`,
                    );
                }
                return new component(type, thickness, color, data);
            },
            addAction: action => {
                setActionHistory(prev => [...prev, action]);
            },
            undo: () => {
                /*
                TODO:
                1. recent = 액션 히스토리 pop()
                2. removeHistory.push(recent)
                3. 서버에 recent를 식별할 수 있는 정보를 보내줌
                4. 앱 전체 히스토리를 받아와서 rerender()
                ---
                우선은 단일 클라이언트 내의 스택으로 리렌더링
             */
                const len = actionHistory.length;
                if (len > 0) {
                    const recent = actionHistory[len - 1];
                    setActionHistory(
                        actionHistory.filter((_, i) => i !== len - 1),
                    );
                    setRemovedHistory(prev => [...prev, recent]);
                    rerender();
                }
            },
            redo: () => {
                const len = removedHistory.length;
                if (len > 0) {
                    const recent = removedHistory[len - 1];
                    setRemovedHistory(
                        removedHistory.filter((_, i) => i !== len - 1),
                    );
                    setActionHistory(prev => [...prev, recent]);
                    rerender();
                }
            },
        },
    ];
};

import { useState, useEffect, useRef } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import MouseDrawingAction from '../modules/actions/MouseDrawingAction';

const clearCanvas = ctx => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

export default () => {
    const [registry, setRegistry] = useState({});
    const [fetchedHistory, setFetchedHistory] = useState(null);
    const [undoHistory, setUndoHistory] = useState([]);
    const [redoHistory, setRedoHistory] = useState([]);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    const canvasRef = useRef(null);

    useEffect(() => {
        const register = (type, component) =>
            setRegistry(prev => ({
                ...prev,
                [type]: component,
            }));

        register('pen', MouseDrawingAction);
        register('eraser', MouseDrawingAction);
    }, []);

    useEffect(() => {
        setCanUndo(undoHistory.length > 0);
    }, [undoHistory.length]);

    useEffect(() => {
        setCanRedo(redoHistory.length > 0);
    }, [redoHistory.length]);

    useEffect(() => {
        if (fetchedHistory) {
            const ctx = canvasRef.current.getContext('2d');
            clearCanvas(ctx);
            fetchedHistory.forEach(action => action.render(ctx));
            setFetchedHistory(null);
        }
    }, [fetchedHistory]);

    const drawManager = {
        createAction(type, thickness, color, data = null) {
            const component = registry[type];
            if (!component) {
                throw new Error(`Component type ${type} is not registered.`);
            }
            return new component(type, thickness, color, data);
        },
        addAction(action) {
            setUndoHistory(prev => [...prev, action]);
            setRedoHistory([]);
        },
        undo() {
            /* TODO:
            1. recent = 액션 히스토리 pop()
            2. removeHistory.push(recent)
            3. 서버에 recent를 식별할 수 있는 정보를 보내줌
            4. 앱 전체 히스토리를 받아와서 rerender()
            ---
            우선은 단일 클라이언트 내의 스택으로 리렌더링
         */
            const len = undoHistory.length;
            if (len > 0) {
                const recent = undoHistory[len - 1];
                setUndoHistory(prev => {
                    const newHistory = prev.filter((_, i) => i !== len - 1);
                    // TODO:
                    // 여긴 나중에 websocket과 연결해야 함.
                    // 우선 임시로 local history로 대체
                    setFetchedHistory(newHistory);
                    // ---------------------------
                    return newHistory;
                });
                setRedoHistory(prev => [...prev, recent]);
            }
        },
        redo() {
            const len = redoHistory.length;
            if (len > 0) {
                const recent = redoHistory[len - 1];
                setRedoHistory(prev => prev.filter((_, i) => i !== len - 1));
                setUndoHistory(prev => {
                    const newHistory = [...prev, recent];
                    // TODO:
                    // 여긴 나중에 websocket과 연결해야 함.
                    // 우선 임시로 local history로 대체
                    setFetchedHistory(newHistory);
                    // ---------------------------
                    return newHistory;
                });
            }
        },
        clear() {
            // TODO:
            // 여긴 좀 고민된다..
            // 서버에서 어떻게 처리해야 할까
            // 일단은 로컬에서 clear 하는걸루. 대신 history는 다 사라짐
            setRedoHistory([]);
            setUndoHistory([]);
            setFetchedHistory([]);
        },
    };

    return [drawManager, canvasRef, canUndo, canRedo];
};

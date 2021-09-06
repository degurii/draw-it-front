import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const connectPromise = url =>
    new Promise((resolve, reject) => {
        const sock = SockJS(url);
        const stompClient = Stomp.over(sock);
        const onConnect = () => resolve(stompClient);
        const onError = error => reject(new Error(error));
        stompClient.connect({}, onConnect, onError);
    });

export default () => {
    const [stomp, setStomp] = useState(null);
    const [success, setSuccess] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState(false);

    const publish = msg => {
        if (!stomp) return;
        console.log('publish');
        stomp.send(process.env.REACT_APP_STOMP_PUBLISH_ENDPOINT, {}, msg);
    };
    const subscribe = callback => {
        if (!stomp) return;
        console.log('subscribe');
        stomp.subscribe(
            process.env.REACT_APP_STOMP_SUBSCRIBE_ENDPOINT,
            callback,
        );
    };

    const connect = async () => {
        try {
            setConnecting(true);
            const stompClient = await connectPromise(
                process.env.REACT_APP_WEBSOCKET_URL,
            );
            stompClient.debug = () => {};
            setStomp(stompClient);
            setSuccess(true);
            setConnecting(false);
        } catch (e) {
            setError(true);
        }
    };

    useEffect(() => {
        connect();
    }, []);

    return [{ subscribe, publish }, success, connecting, error];
};

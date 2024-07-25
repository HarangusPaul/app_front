import "./HomeComponent.css"
import {useEffect, useState} from "react";
import {Button, Icon, Input} from "semantic-ui-react";
import MessageBubble from "./msg/Msg";
import axios from "axios";
import {Subject} from "rxjs";
import SocketComponent from "./Socket/SocketClient";
import {messageSubject} from "../App";
import {Api} from "../Config";

export const msgSubject = new Subject<string>()
export const HomeComponent = () => {
    const [chat, setChat] = useState("Server is running!")
    const [input, setInput] = useState("")
    const [load, setLoad] = useState(0)
    const [messageList, setMessageList] = useState<string[]>(["Input"])

    let list:string[] = []

    useEffect(() => {
        setLoad(load + 1)
    }, []);

    useEffect(() => {
        if (messageList.length === 0) {
            console.log(messageList)
            send()
        }
    }, [messageList]);

    const concatenateStrings = (strings: string[]): string => {
        return strings.join(' ');
    };

    useEffect(() => {
        if (load === 1) {
            messageSubject.subscribe({
                next: (value) => {

                    let messageListCopy = messageList

                    if (value === "first_new_message_to_render") {
                        list = []
                        return
                    }
                    list.push(value)
                    setMessageList(list)
                    console.log(concatenateStrings(list))
                    setChat(concatenateStrings(list))

                }
            })
        }

    }, [load]);


    const send = () => {
        return axios.post(Api + "v1/msg", {command: input}).then((res) => {
            // setChat(res.data);  // Update chat with the response
        }).catch((error) => {
            console.error("There was an error!", error);
        });
    };


    return (
        <div className={"mainApp"}>
            <div className={"containerApp"}>
                <div className={"chatApp"}>
                    <MessageBubble message={chat} sender={"bot"}/>
                </div>
                <div className={"inputApp"}>
                    <Input size={"huge"} value={input} onChange={(value) => {
                        setInput(value.target.value)
                    }} placeholder={"Add here the text!"}/>

                    <Icon name={"send"} className={'arrow'} size={"big"} onClick={() => {
                        setChat("")
                        setMessageList([])
                        setInput("")
                    }}></Icon>
                </div>
            </div>
        </div>
    )
}
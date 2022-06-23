import React, {createContext, useState} from "react";
import {ViewModal} from "./ViewModal";
import {AddOrUpdateModal} from "./AddOrUpdateModal";


export const MODAL_TYPES = { // Строковое представление типов модалок
    VIEW_ARTICLE_MODAL: "VIEW_ARTICLE_MODAL",
    ADD_OR_UPDATE_ARTICLE_MODAL: "ADD_OR_UPDATE_ARTICLE_MODAL",
};

export const UPDATE_OR_ADD_TYPES = {
    ADD: 'ADD',
    UPDATE: 'UPDATE'
}

const MODAL_COMPONENTS: any = { // Строковый ключ соответствует созданному компоненту
    [MODAL_TYPES.VIEW_ARTICLE_MODAL]: ViewModal,
    [MODAL_TYPES.ADD_OR_UPDATE_ARTICLE_MODAL]: AddOrUpdateModal,
};

type ContextType = {
    showModal: (modalType: string, modalProps?: any) => void
    hideModal: () => void
    store: any
};

const initialState: ContextType = {
    showModal: () => {},
    hideModal: () => {},
    store: {}
}

export const GlobalModalContext = createContext(initialState) //Создаем контекст со стартовым значением

// Создаем компонент обертку с собственным стэйтом, в котором находится тип моадлки и дополнительные пропсы для отрисовки данного типа модалки
export const GlobalModal: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [store, setStore] = useState<{modalType: keyof typeof MODAL_COMPONENTS| null, modalProps: any}>();
    const { modalType, modalProps } = store || {};

    const showModal = (modalType: string, modalProps: any = {}) => {
        setStore({
            ...store,
            modalType,
            modalProps
        });
    };

    const hideModal = () => {
        setStore({
            ...store,
            modalType: null,
            modalProps: {}
        });
    };

    const renderComponent = () => {// Возврат компонента по ключу в локальном стейте
        let ModalComponent;
        if(modalType){
            ModalComponent = MODAL_COMPONENTS[modalType];
        }

        if (!modalType || !ModalComponent) {
            return null;
        }

        return <ModalComponent id="global-modal" {...modalProps} />
    };

    return (
        //Передаем в дочерние элементы объект с контекстом, состоящим из локального стейта(тип модалки и пропсы для отрисовки модалки)
        // и функции для показа и скрытия моадлки
        <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
            {renderComponent()}
            {children}
        </GlobalModalContext.Provider>
    );
};

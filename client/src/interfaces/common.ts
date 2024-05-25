export interface IPropsDetails {
    title: string,
    description: string,
    open: boolean
}

export interface IPopupPropsType {
    state: IPropsDetails,
    setState: React.Dispatch<React.SetStateAction<IPropsDetails>>
}

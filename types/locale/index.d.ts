declare type Message = Record<string, any>;
export declare const Locale: {
    messages(): Message;
    /**
     * @description 主要是用来赋值哪种类型的语言，供messages方法来使用
     * @param newLang 语言类型
     * @param newMessages  新增语言字段
     */
    use(newLang: string, newMessages?: Message | undefined): void;
    /**
     * @description 进行新老语言的合并
     * @param newMessages
     */
    add(newMessages?: Message): void;
};
export default Locale;

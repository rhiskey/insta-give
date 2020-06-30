class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = {hasError: false};
    }
    static getDerivedStateFromError(error)
    {
        //Обновить состояние, чтобы след.рендер показал запасной UI
        return{hasError:true};
    }
    componentDidCatch(error, errorInfo){
        //Сохранение ошибки в службу журнала
        logErrorToMyService(error,errorInfo);
    }
    render(){
        if(this.state.hasError)
        {
            return <h1>Что-то пошло не так.</h1>
        }
        return this.props.children;
    }

}
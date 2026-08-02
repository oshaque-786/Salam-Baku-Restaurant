import React from "react";

interface State{
  hasError:boolean;
}

interface Props{
  children:React.ReactNode;
}

class ErrorBoundary extends React.Component<Props,State>{

  constructor(props:Props){
    super(props);

    this.state={
      hasError:false,
    };
  }

  static getDerivedStateFromError(){

    return{
      hasError:true,
    };

  }

  componentDidCatch(error:Error,errorInfo:React.ErrorInfo){

    console.error("Application Error:",error);

    console.error(errorInfo);

  }

  render(){

    if(this.state.hasError){

      return(

        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

          <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-10 text-center">

            <h1 className="mb-4 text-3xl font-bold text-red-400">

              Something went wrong

            </h1>

            <p className="mb-6 text-white/60">

              The application encountered an unexpected error.

            </p>

            <button
              onClick={()=>window.location.reload()}
              className="rounded-lg bg-cyan-500 px-5 py-3 text-white"
            >

              Reload Application

            </button>

          </div>

        </div>

      );

    }

    return this.props.children;

  }

}

export default ErrorBoundary;
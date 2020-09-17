import React from "react";
import axios from "axios";
import logo from "../logo.svg";

interface ILoaderState {
  data: any;
  isLoading: boolean;
  age: number;
}

interface ILoaderProps {
  data: any;
  age: number;
}

const withLoader = <P extends ILoaderState>(
  WrappedComponent: React.ComponentType<P>,
  url: string
) => {
  return class LoaderComponent extends React.Component<
    Partial<ILoaderProps>,
    ILoaderState
  > {
    constructor(props: any) {
      super(props);
      this.state = {
        data: null,
        isLoading: false,
        age: 21
      };
    }

    componentDidMount() {
      this.setState({
        isLoading: true
      });

      axios.get(url).then((result) => {
        this.setState({
          data: result.data,
          isLoading: false
        });
      });
    }

    render() {
      const { data, isLoading } = this.state;
      // console.log(this.props);
      return (
        <>
          {isLoading || !data ? (
            <p>
              data is loading
              <img src={logo} alt="" className="App-logo" />
            </p>
          ) : (
            <WrappedComponent
              {...(this.props as P)}
              isLoading={isLoading}
              data={data}
            />
          )}
        </>
      );
    }
  };
};

export default withLoader;

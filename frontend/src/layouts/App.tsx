import React from "react";
import {HashRouter, Switch, Route, Redirect} from "react-router-dom"
import {RegistrationLayout} from "./publicSection/RegistrationLayout";
import {AuthorizationLayout} from "./publicSection/AuthorizationLayout";
import {DashboardLayout} from "./studentSection/DashboardLayout";
import {ForbiddenLayout} from "./errorLayouts/ForbiddenLayout";
import {userService, User, UserRole} from "../services/api/UserService";
import {Notifications} from "../components/NotificationsComponent";


interface AppProps {
  registrationLink: string;
  authorizationLink: string;
  dashboardLink: string;
}

interface AppState {
  user: User | undefined;
  gotUserAtLeastOnce: boolean;
}

export class App
extends React.Component<AppProps, AppState> {
  constructor (props: AppProps) {
    super(props);
    this.state = {
      user: undefined,
      gotUserAtLeastOnce: false
    };
    userService.subscribe(this.setupUser);
  }

  private readonly setupUser = (user: User | undefined): void => {
    this.setState({
      user: user,
      gotUserAtLeastOnce: true
    });
  }

  componentDidMount (): void {
    userService.getUser();
  }

  private readonly checkUserRole = (role: UserRole | undefined): boolean => {
    if (role === undefined)
      return this.state.user === undefined;
    
    else
      return this.state.user !== undefined && this.state.user.role === role;
  }

  render (): JSX.Element {
    if (!this.state.gotUserAtLeastOnce)
      return <></>;

    // Error section:
    const forbidden: JSX.Element = 
      <ForbiddenLayout
        registrationLink = {this.props.registrationLink}
        authorizationLink = {this.props.authorizationLink}
      />;

    // Guest section:
    const authorization: JSX.Element =
      <AuthorizationLayout registrationLink = {this.props.registrationLink}/>;
    
    const registration: JSX.Element =
      <RegistrationLayout authorizationLink = {this.props.authorizationLink}/>

    // Student section:
    const dashboard: JSX.Element =
      <DashboardLayout/>;
    
    const homepageLink: string = (() => {
      if (this.state.user === undefined)
        return this.props.registrationLink;

      switch (this.state.user.role) {
        case UserRole.student:
          return this.props.dashboardLink;
      }
    })();

    const redirectHomepage: JSX.Element = <Redirect to = {homepageLink}/>;

    const app: JSX.Element =
      <div className = "App">
        <HashRouter hashType = "noslash">
          <Switch>
            <Route exact path = {"/"}>
              {redirectHomepage}
            </Route>
            <Route exact path = {this.props.registrationLink}>
              {this.checkUserRole(undefined) ? registration : redirectHomepage}
            </Route>
            <Route exact path = {this.props.authorizationLink}>
              {this.checkUserRole(undefined) ? authorization : redirectHomepage}
            </Route>
            <Route exact path = {this.props.dashboardLink}>
              {this.checkUserRole(UserRole.student) ? dashboard : forbidden}
            </Route>
          </Switch>
        </HashRouter>
        <Notifications
          maxShownNotificationsCount = {3}
          maxPendingNotificationsCount = {10}
        />
      </div>;

    return app;
  }
}

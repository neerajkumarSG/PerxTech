import React from 'react';
import {Formik} from 'formik';
import './dashboard.css';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';
import styled  from 'styled-components'
const AppWrapper = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    text-align: center;
`;

const DisplayOutput = styled.div`
    width: 600px;
    text-align: left;
`;

const ResWrapper = styled.ul`    
    list-style-type: none;
    padding: 0;
`;

const Row = styled.li`
    display: flex;
    justify-content: flex-end;
`;

const LabelLeft = styled.label`
    padding: .5em 1em .5em 0;
    flex: 1;
`;
const LabelRight = styled.label`
    flex: 2;
    padding: .5em 1em .5em 0;
`;

const ListItemsWrapper = styled.ol`
    flex: 2;
`;

const ListItems = styled.li`
    
`;

class DashboardComponent extends React.Component {

    render() {
        const user  = this.props.user.user !== undefined ? this.props.user.user : []
        const userName = user.length !== 0 ? user[0].owner.login : ''
        const repoUrl = user.length !== 0 ? user[0].owner.repos_url : ''
        const repoNames = user.map((repo, i)=> {
            return <ListItems>{repo.name}</ListItems>
        })
        return (
            <AppWrapper>
                <Formik
                    initialValues={{name: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        this.props.loadUserData(values.name);
                        setSubmitting(false);
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Required')
                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name"><b>GitHub Name</b></label>
                                <input
                                    id="name"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? 'error' : ''}
                                />
                                {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}
                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        );
                    }}
                </Formik>
                {
                    user.length !==0 && <DisplayOutput>
                    <ResWrapper>
                        <Row>
                            <LabelLeft>Login Name</LabelLeft>
                            <LabelRight>{userName}</LabelRight>
                        </Row>    
                        <Row>
                            <LabelLeft>Public Repo</LabelLeft>
                            <LabelRight>{repoUrl}</LabelRight>
                        </Row>    
                        
                        <Row>
                            <LabelLeft>List of Repos</LabelLeft>
                            <ListItemsWrapper>
                                {repoNames}
                            </ListItemsWrapper>
                        </Row>                       
                    </ResWrapper>
                    
                </DisplayOutput>
                }
                
            </AppWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);


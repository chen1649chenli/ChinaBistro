import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = (val)=> val&&val.length;
const maxLength = (len) => (val) => !(val) || val.length <= len;
const minLength = (len) => (val) => val && (val.length >= len);


function RenderComments({comments, postComment, dishId}){
     if (comments != null){
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {comments.map((comment)=>{
                    const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
                    const formattedDate = (new Date(comment.date)).toLocaleDateString('en-US', dateOptions);
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {formattedDate}</p>
                        </li>
                    );
                })}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>           

        );
    }else{
        return (
            <div></div>
        );
    }
}

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>                        
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>                            
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

export class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCommentOpen: false
        };        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isCommentOpen:!this.state.isCommentOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId,
            values.rating, values.username, values.comment);  
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={()=>this.toggleModal()}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={3}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control"  >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>                            
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="username" md={3}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".username" className="form-control" 
                                        id="username" name="username"                                        
                                        placeholder="Your Name" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>                           
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={3}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        row="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
} 
    
const DishDetail = (props) => {
    if (props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }else if (props.dish == null){
        return (
            <div></div>
        );
    }else{
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} 
                    postComment={props.postComment}
                    dishId={props.dish.id} />
                </div>
            </div>
        );
    }
}


export default DishDetail;
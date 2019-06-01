import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardTitle, ListGroup, ListGroupItem, Media } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
 
    }

    renderComments(comments){
        if (comments == null){
            return(
                <div></div>
            );
        }else{
            const review = comments.map((commentItem) => {
                const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
                const formattedDate = (new Date(commentItem.date)).toLocaleDateString('en-US', dateOptions);
                return (
                    <Media list className ="list-unstyled">
                        <div key={commentItem.id} >
                            <p>{commentItem.comment}</p>                            
                            <p>--{commentItem.author}, {formattedDate}</p>
                            <br />
                        </div>
                    </Media>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <ListGroup>
                        { review }
                    </ListGroup>
                </div>

            );
        }
    }
    
    render(){
        const detail = this.props.dish;
        if (detail == null){
            return (
                <div></div>
            );
        }else{
            return (
                <div className="row">
                    <div className ="col-12 col-md-5 m-1">
                        <Card>                        
                            <CardImg top src={detail.image} alt={detail.name} />                            
                            <CardTitle>{detail.name}</CardTitle>
                            <CardText>{detail.description}</CardText>
                        </Card>
                    </div>
                    <div className ="col-12 col-md-5 m-1">
                        {this.renderComments(detail.comments)}
                    </div>
                </div>
            );
        }
    }
}

export default DishDetail;
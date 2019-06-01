import React from 'react';
import { Card, CardImg,  CardText, CardTitle, ListGroup, ListGroupItem, Media } from 'reactstrap';


    function RenderComments({comments}){
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

    function RenderDish({dish}){
        return(
            <Card>                        
                <CardImg top src={dish.image} alt={dish.name} />                            
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </Card>
        );
    }
    
    const DishDetail = (props) => {
        const detail = props.dish;
        if (detail == null){
            return (
                <div></div>
            );
        }else{
            return (
                <div className="row">
                    <div className ="col-12 col-md-5 m-1">
                        <RenderDish dish={detail} />
                    </div>
                    <div className ="col-12 col-md-5 m-1">
                        <RenderComments comments={detail.comments} />
                    </div>
                </div>
            );
        }
    }


export default DishDetail;
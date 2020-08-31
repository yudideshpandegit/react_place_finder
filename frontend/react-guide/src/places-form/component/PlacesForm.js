import React, { Component } from 'react';

import './PlacesForm.css';

import {useHttp} from '../../shared/hooks/http-hooks';

//Redux
import { connect } from 'react-redux';


//Accordian
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';

//TextField

import TextField from '@material-ui/core/TextField';

//FormControl

import FormControl from '@material-ui/core/FormControl'

import Card from '../../shared/UIElements/Card';

//ImageUpload

import ImagesUpload from '../../shared/UIElements/Images';

class PlaceFormComponent extends Component {

    state;

    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                title: {
                    value: '',
                    isValid: false
                },
                description: {
                    value: '',
                    isValid: false
                },
                address: {
                    value: '',
                    isValid: false
                },
                highlight: {
                    skiing: false,
                    paragliding: false,
                    skydiving: false,
                    safari: false,
                    isValid: false
                },
                image:{
                    value:null,
                    isValid:false
                },

                isValid: false
            }
        }

    }

    onInputChangeHandler = (e = null, title, img = null) => {

        let value = null;

        if(img){
            value = img;
        }

        else{
            value = e.target.value;
        }

        this.setState(preState => {
            return {
                inputs: {
                    ...preState.inputs,
                    [title]: {
                        value: value,
                        isValid: true
                    }
                }
            }
        })
    }


    onHighlightHandler = (e, title) => {

        let checked = e.target.checked;

        console.log(checked, title);

        this.setState(preState => {

            return {
                inputs: {
                    ...preState.inputs,
                    highlight: {
                        ...preState.inputs.highlight,
                        [title]: checked,
                        isValid: true
                    }
                }
            }
        })


    }


    onSubmit = async (e) => {

        e.preventDefault();
        
        const response = await fetch('http://localhost:4000/api/place', {
            method:"POST",
            body: JSON.stringify({
                title: this.state.inputs.title.value,
                address: this.state.inputs.address.value, 
                description: this.state.inputs.description.value,
                creator: "u1"
            }),
            headers:{
                'Content-Type': 'application/json'
              }
        })

        const responseData = await response.json();

        console.log(responseData);

        console.log(this.state);


        // this.props.onStoreResult(this.state);

    }



    onDisplay = (e) => {

        console.log(this.props.str);

    }

    onInput = (Image) => {

        console.log(Image);

    }


    render() {

        return (

            <div className='place-form'>
                <div className='place-form__content'>
                    <Card>
                        <div>
                            <p className='place-form__content__title'>New Places</p>
                        </div>
                        <div className='place-form__content__body'>

                            <form onSubmit={this.onSubmit}>
                                <Accordion className='place-form__content__body__accordian'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography >Title</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='place-form__content__body__accordian__accordian-details'>

                                        <FormControl className='place-form__content__body__accordian__accordian-details__form-control'>
                                            <TextField label='Title' onChange={(e) => this.onInputChangeHandler(e, "title")} />
                                        </FormControl>

                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className='place-form__content__body__accordian'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography >Description</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='place-form__content__body__accordian__accordian-details'>

                                        <FormControl className='place-form__content__body__accordian__accordian-details__form-control'>
                                            <TextField label='Description' onChange={(e) => this.onInputChangeHandler(e, "description")} />
                                        </FormControl>

                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='place-form__content__body__accordian'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography >Address</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='place-form__content__body__accordian__accordian-details'>

                                        <FormControl className='place-form__content__body__accordian__accordian-details__form-control'>
                                            <TextField label='Address' onChange={(e) => this.onInputChangeHandler(e, "address")} />
                                        </FormControl>

                                    </AccordionDetails>
                                </Accordion>


{/* 
                                <Accordion className='place-form__content__body__accordian'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography >Highlight</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='place-form__content__body__accordian__accordian-details'>

                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Highlights</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox name="gilad" onChange={(e) => this.onHighlightHandler(e, "skiing")} />}
                                                    label="Skiing"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox name="jason" onChange={(e) => this.onHighlightHandler(e, "paragliding")} />}
                                                    label="Paragliding"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox name="antoine" onChange={(e) => this.onHighlightHandler(e, "skydiving")} />}
                                                    label="Skydiving"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox name="antoine" onChange={(e) => this.onHighlightHandler(e, "safari")} />}
                                                    label="Safari"
                                                />
                                            </FormGroup>
                                        </FormControl>


                                    </AccordionDetails>
                                </Accordion>

                                <div className='place-form__content__image-upload'>
                                    <ImagesUpload onInput = {(e,Image) => this.onInputChangeHandler(e,"image",Image)} />
                                </div> */}

                                <button type='submit' className='btn btn-primary'>Submit</button>

                                <button type='button' className='btn btn-primary' onClick={this.onDisplay}>Display</button>

                            </form>
                        </div>




                    </Card>

                </div>
            </div>

        )

    }
}

const mapStateToProps = state => {
    return {

        str: state.str

    }
};

const mapDispatchToProps = dispatch => {
    return {
        onStoreResult: (result) => dispatch({
            type: "STORE_RESULT",
            value: result
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PlaceFormComponent);
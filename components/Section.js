import React from "react";
import Button from "./Button";
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';

const Section = ( { title, pins, toggle, toggleAll } ) => {
    const isAllDeactivated = pins.filter( ( { isActive } ) => isActive ).length === 0;

    return (
        <div data-testid="section" className="section">
            <div className="section-title">
                <h1>
                    { title }
                </h1>
                <Button className={ !isAllDeactivated && "active" } onClick={ () => toggleAll( isAllDeactivated) }>
                    { isAllDeactivated ? <PowerIcon /> : <PowerOffIcon /> }
                </Button>
            </div>
            <div className="section-buttons">
                { pins.map( pin => (
                    <Button key={pin.name} className={ pin.isActive && "active" } onClick={ () => toggle( pin ) }>
                        { pin.name } { pin.isActive ? "uitschakelen" : "inschakelen" }
                    </Button>
                ) ) }
            </div>
            <style jsx>{`
            .section {
                padding-left: 20px;
                padding-right: 20px;
            }   
            .section-title {
                display: flex;
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
                border-left: 1px solid;
                margin: 0;
            }
            .section-title h1 {
                width: 100%;
                margin: 0;
            }
            .section-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
            `}</style>
        </div>
    )
}

export default Section;
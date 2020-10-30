import React from "react";
import Button from "./Button";

const Section = ( { title, pins, toggle, toggleAll } ) => {
    const isAllDeactivated = pins.filter( ( { isActive } ) => isActive ).length === 0;

    return (
        <div className="section">
            <div className="section-title">
                <h1>
                    { title }
                </h1>
                <Button className={ !isAllDeactivated && "active" } onClick={ () => toggleAll( isAllDeactivated) }>
                    Alles { isAllDeactivated ? "inschakelen" : "uitschakelen" }
                </Button>
            </div>
            <div className="section-buttons">
                { pins.map( pin => (
                    <Button className={ pin.isActive && "active" } onClick={ () => toggle( pin ) }>
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
import React, { Component } from 'react';
import SingleOrderInfo from './SingleOrderInfo';

class DeliveryNotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderToDisplay: {}
        };
        this.renderInvoices = this.renderInvoices.bind(this);
        this.deliveryNoteDisplay = this.deliveryNoteDisplay.bind(this);
    }

    deliveryNoteDisplay(order, e) {
        e.preventDefault();
        this.setState({
            orderToDisplay: order
        });
    } 

    renderInvoices(invoices) {
        if (!_.isEmpty(invoices)) {
            const invoicesList = invoices.map((item) => {
                const order = item.order.data;
                const showDeliveryNoteClick = this.deliveryNoteDisplay.bind(this, order);
                return (
                    <a 
                    href="#" 
                    key={item.id}
                    onClick={showDeliveryNoteClick}
                    >
                        <div className="invoiceNumQuickView">
                        <div className="row">
                            <div className="col-md-6 col-xs-6">
                            <div className="invoiceNum">{`DN-${item.id}`}</div>
                            <div className-="companyName">{item.consolidated_invoice.data.customer.customer}</div>
                            </div>
                            <div className="col-md-6 col-xs-6">
                                <div className="invoiceDate">{item.created_date}</div>
                            </div>
                        </div>
                        </div>
                    </a>
                )
            });
            return (
                <div className="invoiceListWrapper">
                    {invoicesList}
                </div>
            )
        }
        return this.props.loader;
    }
    
    render() {
        const { invoicesData, loader } = this.props;
        const { orderToDisplay } = this.state;
        return (
            <div className="invoiceQuickView">
                <div className="quickViewTitle">Delivery notes</div>
                {this.renderInvoices(invoicesData)}
                <div className="expandDiv">
                <span className="submit-button">
                        <button type="cancel" className="cancel">Expand Table</button>
                    </span>
                </div>
                <SingleOrderInfo order={orderToDisplay} loader={loader}/>
            </div>
        );
    }
}

export default DeliveryNotesList;
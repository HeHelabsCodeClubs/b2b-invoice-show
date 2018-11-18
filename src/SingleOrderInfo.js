import isEmpty from 'lodash.isempty';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-responsive-modal';
// import Jumbo from '../../reusable/Jumbo';
// import { CLOUDINARY_URL } from '../../../../config';
// import Loader from '../common/loader';

class SingleOrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: {},
            showLoader: false
        }
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.getColumnsData = this.getColumnsData.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      const { order } = nextProps;
      if (!isEmpty(order)) {
        if (order !== this.state.data) {
          this.setState({
            open: true,
            showLoader: true
          });
          setTimeout(() => {
            this.setState({
              data: order,
              showLoader: false
            });
          }, 1000)
        } else {
          this.setState({
            open: true,
            showLoader: false
          });
        }
      }
    }
    onOpenModal(){
    this.setState({ open: true });
    };

    onCloseModal(){
    this.setState({ open: false });
    };

    getColumnsData(currencyCode) {
      return [{
        id: 'packageID',
        Header: 'ID',
        accessor: (data) => {
            return (
              <div>{data.id}</div>
            );
        },
        width: 80
      }, {
        id: 'pickUpAddress',
        Header: 'Pick up address',
        accessor: (data) => {
            return data.pick_up_address;
        }
      }, {
        id: 'destination',
        Header: 'Destination address',
        accessor: (data) => {
            return data.destination_address;
        }
      }, {
        id: 'receiverID',
        Header: 'Received by',
        accessor: (data) => {
            return data.destination_user_name;
        }
      }, {
        id: 'StatusId',
        Header: 'Status',
        accessor: (data) => {
            return data.status;
        }
      },{
        id: 'priceID',
        Header: 'Price',
        accessor: (data) => {
            return `${data.price} ${currencyCode}`;
        }
      }
      ];
    }

    renderContent(order, displayLoader) {
      if (!isEmpty(order) && !displayLoader) {
        const packageData = order.packages;
        const columns = this.getColumnsData(order.currency.code);
        return(
          <div className="row reset-row invoiceWrapper">
            {/*********** Invoice Top Panel *************/}
            <div className="row no-gutters no-margin">
              <div className="create-header">
                <span className="create-title invoice-title">{`Delivery note for ${order.customer.customer}`}</span>
                <span className="submit-button">
                    <span><button type="submit" className="cancel print-button"><div className="icon-print-icon"></div>Print</button></span>
                </span>
              </div>
            </div>
            {/* ********** Customer Details ************ */}
            <div className="invoiceHeader">
              <div className="row no-gutters">
                <div className="col-lg-6 col-md-8 col-sm-10">
                  <div>
                    {/* <Jumbo image={`${CLOUDINARY_URL}/EMS_logo2.png`} addc='invoiceEMS-logo' /> */}
                  </div>
                  <div className="invoiceDets">
                  
                    <div className="invoiceNum">{`Order no. ${order.id}`}</div>

                    <div className="row no-gutters">

                      <div className="col-md-6 col-xs-6">
                        <div className="invoiceDetsTitle">Customer</div>
                        {/* <div><Jumbo image={`${CLOUDINARY_URL}/HeHe_LOGO_Original_Landscape-small`} addc='client-logo' /></div> */}
                      </div>
                      <div className="col-md-6 col-xs-6">
                        <div className="invoiceDetsBold">{order.customer.customer}</div>
                        <div className="customerAddress">{order.customer.address}</div>
                      </div>
                      <div className="col-md-7 col-xs-8">
                        <div className="invoiceDetsTitle">Creation Date</div>
                        <div className="invoiceDetsBold invoiceTime">{order.formated_date}</div>
                      </div>
                      <div className="col-md-5 col-xs-4">
                        <div className="invoiceDetsTitle">Status</div>
                        <div className="invoiceDetsBold">{order.status}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ********** Table of services ************ */}
            <div className="transtable">
              <ReactTable 
              data={packageData}
              columns={columns}
              defaultPageSize={5}
              />
            </div>

            <div className="clientInvoiceTotal">
              <div className="invoicetotalDiv">
                <div className="invoicetotal">
                    <div className="totalTitle">SUBTOTAL</div>
                    <div className="total1">{`${order.currency.code} ${order.amount}`}</div>
                    <div className="totalTitle">VAT</div>
                    <div className="total2">{`${order.currency.code} ${order.amount}`}</div>
                </div>
              </div>
              <div className="invoicetotalDiv invoicetotalDiv1">
                <div className="invoicetotal">
                    <div className="totalTitle">TOTAL</div>
                    <div className="total3">{`${order.currency.code} ${order.amount}`}</div>
                </div>
              </div>
            </div>

            <div className="printNot">
              <span className="submit-button">
                    <button type="cancel" className="cancel print-button print-bottom"><div className="icon-print-icon"></div>Print</button>
                </span>
            </div>
          </div>
        );
      }

      return this.props.loader;
    }
    
    render() {
        const { 
          open,
          data,
          showLoader 
        } = this.state;
        return(
            <Modal open={open} onClose={this.onCloseModal} center>
                {this.renderContent(data, showLoader)}
            </Modal>
        )
    }
}

export default SingleOrderInfo;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../Redux/Actions/OrderAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { ORDER_DETAILS_RESET } from "../../Redux/Constants/OrderConstant";
const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { orders, loading, error } = useSelector(state => state.orderMyList);
  const handleClick = (e,order) => {
    e.preventDefault()
    history.push(`/order/${order._id}`)
    dispatch({type: ORDER_DETAILS_RESET})
  }
  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch])
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {
        loading ? (<Loading />) : error ? (<Message>{error}</Message>)
          :
          orders && orders.length === 0 ? (<div className="col-12 alert alert-info text-center mt-3">
            No Orders
            <Link
              className="btn btn-success mx-2 px-3 py-2"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              START SHOPPING
            </Link>
          </div>) :
            (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>STATUS</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map((order, index) => (
                      <tr key={index} className={`link ${order.isPaid ? "alert-success" : "alert-danger"}`} 
                          onClick={(e)=> handleClick(e,order)}>
                          <td>{index + 1}</td>
                          <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                          <td>{moment(order.createdAt).calendar()}</td>
                          <td>${order.totalPrice}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
      }
    </div>
  );
};

export default Orders;

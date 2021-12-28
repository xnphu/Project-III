import React, { Component } from "react";
import { Card, CardBody, Progress } from "reactstrap";


class TopCities extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        {/* <CardTitle className="mb-4">
                            Từ khóa nổi bật
                        </CardTitle> */}
                        {/* <div className="text-center">
                            <div className="mb-4">
                                <i className="bx bx-map-pin text-primary display-4"></i>
                            </div>
                            <h3>1,456</h3>
                            <p>Covid-19</p>
                        </div> */}

                        <div className="table-responsive mt-4">
                            <table className="table table-centered table-nowrap mb-2">
                                <tbody>
                                    <tr>
                                        <td style={{ width: "30%" }} >
                                            <p className="mb-0">Covid-19</p>
                                        </td>
                                        <td style={{ width: "25%" }} >
                                            <h5 className="mb-0">1,456</h5></td>
                                        <td>
                                            <Progress value="94" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Chị bán rau</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,123</h5>
                                        </td>
                                        <td>
                                            <Progress value="82" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Máy xét nghiệm</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">1,026</h5>
                                        </td>
                                        <td>
                                            <Progress value="70" color="primary" className="bg-transparent" size="sm" />
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default TopCities;

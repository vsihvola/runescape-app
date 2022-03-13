import './components.css';
import React from 'react';
import { Form, FormLabel, FormGroup, Row, Col } from 'react-bootstrap';
import FetchItem from './helpers/FetchItem';
import StoreItem from './helpers/StoreItem';

class ArchMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch('./archeology.json')
      .then((res) => res.json())
      .then((json) => {
        this.setState({ items: json.materials, isLoaded: true });
      });
  }

  render() {
    const { items, isLoaded } = this.state;

    if (!isLoaded)
      return (
        <div>
          <h1> Pleses wait some time.... </h1>{' '}
        </div>
      );

    return (
      <>
        <div className="archMaterials">
          <Form>
            <div>
              {items.map((item) => (
                <Row className="textColumn" as={Col} key={JSON.stringify(item)}>
                  <FormLabel className="groupHeader">{item.name}</FormLabel>
                  <Row>
                    {item.materials.map((material) => (
                      <Col sm={4} key={JSON.stringify(material)}>
                        <FormGroup>
                          <FormLabel>
                            {material.name}
                            <Form.Control
                              onChange={(e) => StoreItem(material.name, e.target.value)}
                              type="text"
                              size="sm"
                              placeholder={FetchItem(material.name)}
                            />
                          </FormLabel>
                        </FormGroup>
                      </Col>
                    ))}
                  </Row>
                </Row>
              ))}
            </div>
          </Form>
        </div>
      </>
    );
  }
}

export default ArchMaterials;

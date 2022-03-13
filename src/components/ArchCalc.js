import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Form,
  Table,
  Row,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Alert,
  Button
} from 'react-bootstrap';
import './components.css';
import FetchItem from './helpers/FetchItem';

class ArchCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      isLoaded: false,
      middleOfSelection: false,
      selectedCollection: [],
      setsStatus: false,
      sets: 0,
      neededMaterials: [],
      experienceGoal: 0,
      setsNeeded: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('./archeology.json')
      .then((res) => res.json())
      .then((json) => {
        this.setState({ collections: json.collections, isLoaded: true });
      });
  }

  experienceCalculator(e) {
    e.preventDefault();
    let html = (
      <>
        {this.state.experienceGoal > 0 && (
          <Col key="calculator-experience-goal">
            <Table variant="dark">
              <thead>
                <tr>
                  <th>Sets needed</th>
                </tr>
              </thead>
              <tbody>
                <tr key="experience-goal">
                  <td>
                    {Math.ceil(
                      this.state.selectedCollection.rewards[0].experience /
                        this.state.experienceGoal
                    )}
                    {console.log(this.state.selectedCollection.rewards[0].experience)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        )}
      </>
    );
    this.setState({ setsNeeded: html });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.middleOfSelection) {
      let html = (
        <>
          <Col xs lg="2" key="calculator-stuff">
            <Table variant="dark">
              <thead>
                <tr>
                  <th>Needed</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedCollection.materials.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>
                      {this.state.sets * m.amount - FetchItem(m.name) > 0
                        ? this.state.sets * m.amount - FetchItem(m.name)
                        : '0 ' + '(' + FetchItem(m.name) + ')'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col key="calculator-rewards">
            <Table variant="dark">
              <thead>
                <tr>
                  <th>Experience</th>
                  <th>Chrononotes</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedCollection.rewards.map((r) => (
                  <tr key={r.name}>
                    <td>
                      {(r.experience * this.state.sets).toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}
                    </td>
                    <td>
                      {(r.chrononotes * 2 * this.state.sets).toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </>
      );
      this.setState({ neededMaterials: html });
    } else {
      let html = (
        <Col xs lg="2">
          <Alert variant="warning">
            <Alert.Heading>Choose collection first.</Alert.Heading>
          </Alert>
        </Col>
      );
      this.setState({ neededMaterials: html });
    }
  }

  render() {
    const { collections, isLoaded, middleOfSelection, selectedCollection, neededMaterials } =
      this.state;
    const artifactMapping = () => {
      const artifacts = selectedCollection.artifacts.map((a) => (
        <tr key={a.name}>
          <td>{a.name}</td>
        </tr>
      ));
      return artifacts;
    };

    const materialMapping = () => {
      const artifacts = selectedCollection.materials.map((a) => (
        <tr key={a.name}>
          <td>{a.name}</td>
          <td>{a.amount}</td>
        </tr>
      ));
      return artifacts;
    };

    const handleSelect = (e) => {
      collections.filter((element) => {
        if (element.name === e) {
          this.setState({ middleOfSelection: true, selectedCollection: element });
        }
      });
    };

    if (!isLoaded)
      return (
        <div>
          <h1> Pleses wait some time.... </h1>{' '}
        </div>
      );
    return (
      <>
        <Container className="main-class">
          <Container>
            <Row>
              <h1>Calculator</h1>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <Dropdown className="d-inline mx-2">
                  <DropdownButton
                    className="archCalcToggle"
                    title={middleOfSelection ? selectedCollection.name : 'Choose collection'}
                    variant="dark"
                    onSelect={handleSelect}>
                    {collections.map((collection) => (
                      <Dropdown.Item
                        title={collection.name}
                        key={JSON.stringify(collection.name)}
                        eventKey={collection.name}>
                        {collection.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Dropdown>
              </Col>
              <Col xs lg="3">
                <Form
                  variant="dark"
                  style={{ display: 'inline-block' }}
                  onSubmit={this.experienceCalculator}>
                  <Row className="textColumn">
                    <Form.Label>Experience goal</Form.Label>
                    <Form.Group>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={0}
                        placeholder="e.g. 1300000"
                        onChange={(e) =>
                          this.setState({ experienceGoal: e.target.value })
                        }></Form.Control>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Button type="submit" variant="primary">
                      Calculate
                    </Button>
                  </Row>
                </Form>
              </Col>
              <Col xs lg="3">
                <Form
                  variant="dark"
                  style={{ display: 'inline-block' }}
                  onSubmit={this.handleSubmit}>
                  <Row className="textColumn">
                    <Form.Label>How many sets you wanna create</Form.Label>
                    <Form.Group>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={0}
                        max={100}
                        onChange={(e) => this.setState({ sets: e.target.value })}></Form.Control>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Button type="submit" variant="primary">
                      Calculate
                    </Button>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col xs lg="2">
                <Table variant="dark">
                  <thead>
                    <tr>
                      <th>Artifacts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {middleOfSelection ? (
                      artifactMapping()
                    ) : (
                      <tr>
                        <td>Choose collection..</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
              <Col xs lg="2">
                <Table variant="dark">
                  <thead>
                    <tr>
                      <th>Materials</th>
                    </tr>
                  </thead>
                  <tbody>
                    {middleOfSelection ? (
                      materialMapping()
                    ) : (
                      <tr>
                        <td>Choose collection..</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
              {neededMaterials}
            </Row>
          </Container>
        </Container>
      </>
    );
  }
}

export default ArchCalc;

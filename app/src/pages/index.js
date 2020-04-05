import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import axios from "axios"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { data } from "../components/test.js"
// const app = express()
// const cors = require('cors')

const styles = {
  container: {
    width: "100%",
    height: "70vh",
  },
  containerLeft: {
    padding: "10px",
    float: "left",
    width: "45%",
    height: "100%",
    marginRight: "10%",
  },
  titleWrapper: {
    height: "30px",
    width: "100%",
    marginBottom: "20px",
  },
  listWrapper: {
    paddingRight: "10px",
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
  row: {
    padding: "5px",
    fontSize: "12px",
    width: "100%",
    height: "70px",
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "black",
  },

  input: {
    width: "70%",
    height: "100%",
  },
  button: {
    backgroundColor: "white",
    width: "30%",
    height: "100%",
  },
  profilePic: {
    padding: "5px",
    width: "20%",
    float: "left",
    height: "100%",
  },
  leftRow: {
    width: "80%",
    float: "left",
    height: "100%",
  },
  topRow: {
    fontWeight: "700",
    width: "100%",
    float: "left",
    height: "30%",
  },
  bottomRow: {
    marginTop: "5px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    float: "left",
    lineHeight: "14px",
    maxHeight: "28px",
    width: "100%",
    height: "70%",
  },
  username: {
    width: "30%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    height: "100%",
    float: "left",
  },
  screenname: {
    color: "gray",
    width: "70%",
    float: "left",
  },
  text: {},
  containerRight: {
    padding: "10px",
    height: "100%",
    float: "left",
    backgroundColor: "white",
    width: "45%",
  },
}

class IndexPage extends React.Component {
  state = {
    tweetList: [],
    savedTweetList: [],
    keyword: "obama",
    isLoading: false,
  }

  componentDidMount() {
    let keyword = this.state.keyword
    this.setState({ tweetList: data })
  }

  getTweetList() {
    const keyword = this.state.keyword
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded"
    const data = axios
      .get(
        `http://tweetsaver.herokuapp.com/?q=${keyword}&callback=yourJSONPCallbackFn&count=10`
      )
      .then(response => {
        console.log(data)
        return response.json()
      })
    console.log("data", data)
  }

  search() {
    this.getTweetList()
  }

  render() {
    const onChangeText = e => {
      console.log(e)
      this.setState({ search: e.target.value })
    }

    const dragStart = e => {
      e.dataTransfer.setData("id", e.target.id)
    }

    const allowDrop = e => {
      e.preventDefault()
    }

    const drop = e => {
      e.preventDefault()
      console.log("[^-^] DROP DATA", e)

      let data = e.dataTransfer.getData("id")
      console.log("[^-^] DROPDATA", data)
    }

    const tweetList = tweetList =>
      tweetList.map(tw => {
        return (
          // <Card tw={tw} />
          <div
            style={styles.row}
            ondragstart={e => dragStart(e)}
            draggable="true"
            id={tw.id}
          >
            <div style={styles.profilePic}>
              <img src={tw.user.profileImageUrlHttps} />
            </div>
            <div style={styles.leftRow}>
              <div style={styles.topRow}>
                <div style={styles.username}>{tw.user.name}</div>{" "}
                <div style={styles.screenname}>@{tw.user.screenName}</div>{" "}
              </div>
              <div style={styles.bottomRow}>{tw.text}</div>
            </div>
          </div>
        )
      })

    return (
      <Layout>
        <SEO title="Home" />
        <div style={styles.container}>
          <div style={styles.containerLeft}>
            <div style={styles.titleWrapper}>
              <input
                style={styles.input}
                value={this.state.search}
                placeholder={"type something to search"}
                onChange={x => onChangeText(x)}
              />
              <button style={styles.button} onClick={() => this.getTweetList()}>
                Search
              </button>
            </div>
            <div
              style={styles.listWrapper}
              class="droptarget"
              onDrop={e => {
                drop(e)
              }}
              onDragOver={e => {
                allowDrop(e)
              }}
            >
              {tweetList(this.state.tweetList)}
            </div>
          </div>
          <div style={styles.containerRight}>
            <div style={styles.titleWrapper}>
              <div style={styles.title}>Saved Tweets</div>
            </div>
            <div
              style={styles.listWrapper}
              class="droptarget"
              onDrop={e => {
                drop(e)
              }}
              onDragOver={e => {
                allowDrop(e)
              }}
            >
              {tweetList(this.state.savedTweetList)}
            </div>
            <div style={styles.savedContainer}></div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import axios from "axios"
import { TiDelete, TiArrowRightOutline } from "react-icons/ti"
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
  },
  containerCenter: {
    width: "10%",
    textAlign: "center",
    height: "100%",
    float: "left",
  },
  titleWrapper: {
    height: "30px",
    width: "100%",
    marginBottom: "20px",
  },
  title:{
    width: '44%',
    float: 'left'
  },
  count:{
    paddingBottom: '28px',
    width: '35px',
    height: '25px',
    fontSize: '15px',
    textAlign:'center',
    borderRadius : '10px',
    backgroundColor: 'rebeccapurple',
    color: 'white',
    float: 'left'
  },
  listWrapper: {
    paddingRight: "10px",
    width: "100%",
    height: "100%",
    overflow: "scroll",
    overflowX: "hidden",
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
    width: "25%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    height: "100%",
    float: "left",
  },
  screenname: {
    color: "gray",
    width: "60%",
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
    draggedover: false,
  }

  componentDidMount() {
    let keyword = this.state.keyword
    let savedItem = localStorage.getItem("savedTweetList")
    let savedTweetList = savedItem ? JSON.parse(savedItem) : []
    this.setState({ tweetList: data, savedTweetList: savedTweetList })
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
        return response.json()
      })
  }

  search() {
    this.getTweetList()
  }

  render() {
    const onChangeText = e => {
      this.setState({ search: e.target.value })
    }

    const dragStart = e => {
      e.dataTransfer.setData("id", e.target.id)
    }

    const allowDrop = e => {
      e.preventDefault()
      this.setState({
        draggedover: true,
      })
    }

    const saveToLocal = savedList => {
      if (typeof Storage !== "undefined") {
        // if the storage exists, save it to storage
        localStorage.setItem("savedTweetList", JSON.stringify(savedList))
      } else {
        alert("Sorry! No Web Storage support..")
      }
    }

    const drop = async e => {
      e.preventDefault()
      this.setState({
        draggedover: false,
      })
      const id = e.dataTransfer.getData("id")
      if (e.target.className === "droptarget2") {
        //delete from tweetList and move to savelist and save the array in the local storage.
        const tweetList = this.state.tweetList
        const data = tweetList.find(tweet => {
          return parseInt(tweet.id) == id ? tweet : null
        })
        if (data) {
          const savedTemp = this.state.savedTweetList
          if (savedTemp.filter(tweet => tweet.id == id).length < 1) {
            savedTemp.unshift(data)
            //save to local storage
            saveToLocal(savedTemp)
            this.setState({
              savedTweetList: savedTemp,
            })
          } else {
            alert("this tweet is already saved")
          }
        } else {
          alert("Tweet doesn't exist")
          return
        }
      }
    }

    const unsaveTweet = async id => {
      let temp = this.state.savedTweetList
      temp = temp.filter(tweet => tweet.id !== id)
      this.setState({ savedTweetList: temp })
      saveToLocal(temp)
    }

    const tweetList = (tweetList, type) =>
      tweetList.map(tw => {
        return (
          <div
            style={styles.row}
            onDragStart={e => dragStart(e)}
            draggable="true"
            id={tw.id}
            key={tw.id}
          >
            <div style={styles.profilePic}>
              <img src={tw.user.profileImageUrlHttps} />
            </div>
            <div style={styles.leftRow}>
              <div style={styles.topRow}>
                <div style={styles.username}>{tw.user.name}</div>{" "}
                <div style={styles.screenname}>@{tw.user.screenName}</div>{" "}
                {type == 1 ? (
                  <div>
                    <TiDelete
                      style={{
                        width: "15%",
                        float: "left",
                        height: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        unsaveTweet(tw.id)
                      }}
                    />
                  </div>
                ) : null}
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
                placeholder={"Type something to search"}
                onChange={x => onChangeText(x)}
              />
              <button style={styles.button} onClick={() => this.getTweetList()}>
                Search
              </button>
            </div>
            <div
              style={styles.listWrapper}
              className="droptarget1"
              onDrop={e => {
                drop(e)
              }}
              onDragOver={e => {
                allowDrop(e)
              }}
            >
              {tweetList(this.state.tweetList, 0)}
            </div>
          </div>
          <div style={styles.containerCenter}>
            <TiArrowRightOutline
              style={{
                color: "#B19CD9",
                marginTop: "50%",
                width: "60%",
                height: "60%",
              }}
            />
          </div>
          <div style={styles.containerRight}>
            <div style={styles.titleWrapper}>
            <div style={styles.title}><h3>Saved Tweets</h3></div> <div style={styles.count}>{this.state.savedTweetList.length}</div>
            </div>
            <div style={styles.listWrapper}>
              {tweetList(this.state.savedTweetList, 1)}
              {this.state.draggedover ? (
                <div
                  className="droptarget2"
                  onDrop={e => {
                    drop(e)
                  }}
                  onDragOver={e => {
                    allowDrop(e)
                  }}
                  style={{
                    width: "40%",
                    height: "420px",
                    float: "left",
                    position: "absolute",
                    opacity: "0.3",
                    top: "180px",
                    textAlign: "center",
                    padding: "auto",
                    fontWeight: "800",
                  }}
                ></div>
              ) : null}
            </div>
            <div style={styles.savedContainer}></div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

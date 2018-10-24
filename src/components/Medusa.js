import React from 'react'
import MedusaSVG from '../assets/images/cardano-docs-repo-explorer.svg'
import { detect } from 'detect-browser'

class Medusa extends React.Component {
  constructor(props) {
     super(props);
     this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount() {
    //InitMedusa()
    window.addEventListener('load', this.handleLoad)
    window.addEventListener('resize', this.handleResize)
  }

  handleResize() {
    const resizer = {
      scene: {
        width: window.innerWidth
      }
    }
    medusa.setConfig(resizer)
  }

  handleLoad() {

    const config = {
      git: {
        owner: 'input-output-hk',
        repo: 'cardano-sl',
        branch: 'master',
        commitHash: '', // hash of commit to load
        commitDate: '', // date to load (YYYY-MM-DD)
        loadLatest: true // load latest commit in db
      },
      display: {
        showUI: false,
        showSidebar: true,
        showClose: true,
      },
      widget:{
        about: {
          title: 'About',
          slug: 'about',
          content: "<p>Medusa is a real-time visualization of the <b>Cardano Rust project</b>. It acts like 'living artwork' where you can view the entire project history. Explore the enormous engineering work going on behind the scenes along with the active involvement of the community.</p>",
        },
        commitList: {
          title: 'Commit List',
          slug: 'commit-list'
        },
        milestones: {
          title: 'Milestones',
          slug: 'milestones'
        },
        calendar: {
          title: 'Browse by day',
          slug: 'calendar'
        }
      },
      FDG: {
        nodeSpritePath: '/textures/dot.png', // path to node texture
        nodeUpdatedSpritePath: '/textures/dot-concentric.png', // path to node updated state texture
        fontTexturePath: '/textures/UbuntuMono.png', // path to font texture
        autoPlay: false,
        delayAmount: 1000, // time in between new commits being added to the graph
        sphereProject: 0, // project graph onto sphere? 1 == true, 0 == false
        usePicker: false, // show file commit details on click
        pickerLoadingPath: '/loading.svg', // show file commit details on click
        sphereRadius: 500, // radius of sphere if in sphere projection mode
        showFilePaths: true, // display filepath overlay on nodes
        colorCooldownSpeed: 0.05, // speed at which node colors cycle
        cycleColors: false, // cycle colors based on file edit time from red to blue to white
        colorPalette: [ // colors to use if cycleColors is switched off (colors cannot contain)
          '#eb2256',
          '#f69ab2',
          '#eb2256',
          '#6f9cef',
          '#652b91',
          '#0e5c8d',
          '#1fc1c3'
        ]
      },
      scene: {
        fullScreen: false,
        width: window.innerWidth,
        height:800,
        bgColor: 0x121327,
        antialias: false,
        canvasID: 'medusa-stage', // ID of webgl canvas element
        autoRotate: false, // auto rotate camera around target
        autoRotateSpeed: 0.001 // speed of auto rotation
      },
      post: {
        vignette: true
      },
      camera: {
        fov: 45,
        initPos: {x: 0, y: 0, z: 800},
        enableZoom: false // enable camera zoom on mousewheel/pinch gesture
      }
    }
    if (medusa.canRun()) {
      medusa.init(config)
    }
  }

  render () {
    const browser = detect()

    const opener = {
      display: {
        showUI: true,
        showSidebar: true
      },
      camera: {
        enableZoom: true
      },
      scene: {
        fullScreen: true
      },
      FDG: {
        usePicker: true,
      },
    }
    const triggermedusa = () => {
      window.history.replaceState({}, "", "/?medusa=fullscreen")
      medusa.setConfig(opener)
    }
    const medusahtml = (browser.name == 'ie') ? <div className='medusa-section'></div> : <div><div id='medusa-root'></div><button className='medusa-launch-btn bg-transparent border-0' onClick={triggermedusa}><img src={MedusaSVG} alt='' /></button></div>

    return (
      <div>
        {medusahtml}
      </div>
    )
  }
}

export default Medusa

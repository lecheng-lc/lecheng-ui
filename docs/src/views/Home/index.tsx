import { defineComponent, onMounted } from 'vue'
import Layout from '../../components/Layout'
import './home.scss'
export default defineComponent({
  name: 'Home',
  setup() {
    const doDealCharacters = () => {
      (function formatContent() {
        const container = document.querySelector('.home_page-content') as HTMLElement
        const content = container.innerText
        var contentArray = content.split(' ')
        console.log(contentArray)
        var formattedContent = document.createElement('div')
        contentArray.map(function (word) {
          formattedContent.appendChild(createWord(word))
        });
        container.replaceChild(formattedContent, (container as any).firstChild)
      }())
      function createWord(characters:string) {
        var word = document.createElement('div')
        var wordArray = characters.split('')
        wordArray.map(function (char) {
          word.appendChild(formatCharacter(char))
        });
        word.appendChild(formatCharacter(' '))
        return word;
      }

      function formatCharacter(text: string) {
        var text = text === ' ' ? ' ' : text
        var character = document.createElement('span')
        character.innerHTML = text
        return character
      }
    }
    onMounted(() => {
      doDealCharacters()
    })
    const slots = {
      center: () => <div class="home_page-content"><p>Vue3.0+ts效果笔记</p></div>
    }
    return () => (
      <div class="home">
        <Layout msg="Welcome to Your Vue.js + TypeScript App" v-slots={slots}>
        </Layout>
      </div>
    )
  }
})
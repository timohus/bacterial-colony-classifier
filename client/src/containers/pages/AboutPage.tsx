import React, {FunctionComponent} from 'react'
import accuracyImg from 'assets/images/v5.png'
import culturesImg from 'assets/images/cultures.png'


type ComponentProps = {
  data: any | null
}


const CLASSES = ['Acinetobacter.baumanii', 'Actinomyces.israeli', 'Bacteroides.fragilis', 'Bifidobacterium.spp',
  'Candida.albicans', 'Clostridium.perfringens', 'Enterococcus.faecalis', 'Enterococcus.faecium',
  'Escherichia.coli', 'Fusobacterium', 'Lactobacillus.casei', 'Lactobacillus.crispatus',
  'Lactobacillus.delbrueckii', 'Lactobacillus.gasseri', 'Lactobacillus.jehnsenii',
  'Lactobacillus.johnsonii', 'Lactobacillus.paracasei', 'Lactobacillus.plantarum',
  'Lactobacillus.reuteri', 'Lactobacillus.rhamnosus', 'Lactobacillus.salivarius',
  'Listeria.monocytogenes', 'Micrococcus.spp', 'Neisseria.gonorrhoeae', 'Porfyromonas.gingivalis',
  'Propionibacterium.acnes', 'Proteus', 'Pseudomonas.aeruginosa', 'Staphylococcus.aureus',
  'Staphylococcus.epidermidis', 'Staphylococcus.saprophiticus', 'Streptococcus.agalactiae',
  'Veionella']


const HomePage: FunctionComponent<ComponentProps> = ({data}) => {
  if (data === null) return <p>No data.</p>

  return (
    <div className="p-6 pb-12">
      <h1 className="text-blueGray-700">About</h1>

      <div className="flex mt-6 text-blueGray-700">
        <div className="w-1/2 space-y-2">
          <p>This application is an image classifier. The input is a photo of a bacterial culture taken from the Petri
            dish. The idea comes from the paper <a target="_blank" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5599001/">
              Deep learning approach to bacterial colony classification</a>.
          </p>

          <p>The authors made their code available <a target="_blank" href="https://github.com/bartoszzielinski/deep-fbanks">here</a>,
            though this application does not use it. The model was trained on the original dataset
            (can be found <a target="_blank" href="http://misztal.edu.pl/software/databases/dibas/">here</a>)
            using TensorFlow and its accuracy is approximately 82%.
          </p>

          <p>The classification is performed within the following list:</p>

          <div className="pt-6 pb-6 text-blueGray-500">
            <ul className="list-inside" style={{columns: 2}}>
              {
                CLASSES.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))
              }
            </ul>
          </div>

          <p>TensorFlow is used in the backend to make the predictions.</p>

          <p>
            Interesting material on the topic: <br/>
            - <a target="_blank" href="https://ddd.uab.cat/pub/tesis/2018/hdl_10803_666842/emf1de1.pdf">Image Analysis of Bacterial Colonies in Classic and Alternative Gel-Based Growth Media</a>.<br/>
            - <a target="_blank" href="http://www.microbia.org/index.php/resources">MicrobIA Project</a>. Using masking in the model training. Links to the large datasets and code.
          </p>
        </div>

        <div className="w-1/2 pl-6">
          <img src={accuracyImg} className="block w-96" alt="" />
        </div>
      </div>
    </div>
  )
}


export default HomePage

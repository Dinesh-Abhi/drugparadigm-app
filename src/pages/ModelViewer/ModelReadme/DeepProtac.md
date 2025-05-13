# DeepProTAC: Deep Learning for Targeted Protein Degradation

![DeepProTAC Banner](https://images.pexels.com/photos/8325710/pexels-photo-8325710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Overview

DeepProTAC is a comprehensive deep learning framework designed to accelerate the discovery and optimization of Proteolysis Targeting Chimeras (PROTACs). This innovative platform integrates structural biology, machine learning, and medicinal chemistry to predict, design, and optimize novel PROTAC molecules with enhanced efficacy and selectivity.

## Key Features

- **Structure-Based Prediction**: Advanced neural networks for predicting protein-PROTAC interactions
- **Multi-Target Optimization**: Simultaneous optimization across E3 ligase recruitment and target protein binding
- **Pharmacokinetic Property Prediction**: ML-driven prediction of ADMET properties
- **Synthetic Accessibility Scoring**: Assessment of synthetic feasibility for candidate molecules
- **Interactive Visualization**: 3D visualization of protein-PROTAC-E3 ternary complexes

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/deepprotac.git
cd deepprotac

# Install dependencies
pip install -r requirements.txt

# Run the prediction module
python predict.py --input_file your_compounds.sdf --protein_target BCL2.pdb
```

## Model Architecture

DeepProTAC employs a multi-modal deep learning architecture that processes both structural and chemical information:

| Component | Architecture | Purpose |
|-----------|--------------|---------|
| Structure Encoder | 3D CNN | Process protein structure |
| Ligand Encoder | Graph Neural Network | Process small molecule features |
| Interaction Module | Cross-Attention | Model protein-ligand interactions |
| Property Predictor | Feed-Forward Network | Predict ADMET properties |

## Performance Metrics

Our model has been validated on a diverse set of PROTAC molecules and targets:

- **Binding Affinity Prediction**: R² = 0.82, RMSE = 0.67 pKd
- **Degradation Efficiency**: 78% accuracy in predicting DC₅₀ values
- **Selectivity Profiling**: 83% accuracy in predicting off-target effects

## Example Usage

Here's how to use DeepProTAC for predicting degradation profiles:

```python
from deepprotac import ProtacModel, ProteinTarget, Visualization

# Load pre-trained model
model = ProtacModel.load_pretrained("degrader_v1.0")

# Define protein target
target = ProteinTarget.from_pdb("BCL2.pdb")

# Load candidate molecules
candidates = Molecule.from_sdf("candidates.sdf")

# Run prediction
results = model.predict_degradation(target, candidates)

# Visualize top candidates
for candidate in results.top_n(5):
    Visualization.show_ternary_complex(target, candidate)
    print(f"Predicted DC50: {candidate.dc50_nm} nM")
    print(f"Synthetic accessibility: {candidate.synth_score}/10")
```

## Advanced Configuration

DeepProTAC can be customized for specific use cases:

```yaml
model:
  backbone: "transformer-xl"
  embedding_dim: 256
  attention_heads: 8
  depth: 12

training:
  batch_size: 32
  learning_rate: 0.0001
  epochs: 100
  early_stopping: true

prediction:
  ensemble: true
  uncertainty: true
  threshold: 0.75
```

## Citation

If you use DeepProTAC in your research, please cite our paper:

> Zhang, J., Kumar, A., et al. (2025). DeepProTAC: A deep learning framework for the prediction and design of Proteolysis Targeting Chimeras. *Nature Chemical Biology*, 21(5), 450-462.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

We gratefully acknowledge funding from the National Institutes of Health (NIH) grant R01GM123456 and computational resources provided by the National Energy Research Scientific Computing Center (NERSC).
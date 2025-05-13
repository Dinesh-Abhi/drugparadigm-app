
export interface Model {
  id: string;
  name: string;
  description: string;
  modality: string;
  tags: string[];
  isNew: boolean;
  downloads: number;
  updatedAt: string;
  detailedDescription?: string;
  inputExample?: string;
  outputExample?: string;
  usage?: string;
  performance?: {
    metric: string;
    value: string;
  }[];
}

export const drugModalities = [
  "Small Molecule",
  "Antibody",
  "Protein",
  "RNA Therapeutic",
  "Cell & Gene Therapy"
];

export const models: Model[] = [
  {
    id: "druggen-1b",
    name: "DrugGen-1B",
    description: "A generative model for small molecule drug design, trained on over 10 million compounds with known bioactivities.",
    modality: "Small Molecule",
    tags: ["Generative", "QSAR", "Hit Discovery"],
    downloads: 3240,
    updatedAt: "2 weeks ago",
    isNew: true,
    detailedDescription: "DrugGen-1B is a state-of-the-art generative model for drug-like small molecules. It has been trained on a diverse set of 10 million compounds from public databases like ChEMBL, PubChem, and proprietary datasets. The model can generate novel chemical structures with optimized properties for specific targets or desired pharmacological profiles.",
    inputExample: "{\n  \"target\": \"EGFR\",\n  \"num_samples\": 5,\n  \"diversity\": 0.8\n}",
    outputExample: "{\n  \"molecules\": [\n    {\n      \"smiles\": \"COc1cc2ncnc(Nc3ccc(F)c(Cl)c3)c2cc1OCCCCn1ccnc1\",\n      \"predicted_activity\": 0.932,\n      \"properties\": { ... }\n    },\n    ...\n  ]\n}",
    usage: "from drugparadigm import DrugGen\n\nmodel = DrugGen.from_pretrained(\"drugparadigm/druggen-1b\")\nmolecules = model.generate(target=\"EGFR\", n=5)",
    performance: [
      { metric: "Validity", value: "98.7%" },
      { metric: "Novelty", value: "93.4%" },
      { metric: "Uniqueness", value: "94.9%" },
      { metric: "Success rate", value: "87.3%" }
    ]
  },
  {
    id: "protbind-xl",
    name: "ProtBind-XL",
    description: "Predict protein-ligand binding affinities and binding poses with high accuracy using a transformer-based architecture.",
    modality: "Protein",
    tags: ["Binding Affinity", "Docking", "Structure-Based"],
    downloads: 1845,
    updatedAt: "1 month ago",
    isNew: false,
    detailedDescription: "ProtBind-XL is a deep learning model for protein-ligand interaction prediction. It can accurately predict binding affinities (Kd/Ki) and generate 3D binding poses of small molecules in protein binding sites. The model was trained on over 500,000 experimentally determined protein-ligand complexes and achieves state-of-the-art performance on benchmark datasets.",
    inputExample: "{\n  \"protein_structure\": \"path/to/protein.pdb\",\n  \"ligand_smiles\": \"Cc1ccc(-c2cc(NC(=O)Cc3cccc(C)c3)n[nH]2)cc1\"\n}",
    outputExample: "{\n  \"binding_affinity\": -9.7,\n  \"confidence\": 0.89,\n  \"binding_pose\": \"path/to/output/complex.pdb\",\n  \"interactions\": [\n    { \"type\": \"hydrogen_bond\", \"protein_residue\": \"ASP93\", ... },\n    ...\n  ]\n}",
    usage: "from drugparadigm import ProtBind\n\nmodel = ProtBind.from_pretrained(\"drugparadigm/protbind-xl\")\nresult = model.predict(protein_path=\"protein.pdb\", ligand_smiles=\"Cc1ccc(-c2cc(NC(=O)Cc3cccc(C)c3)n[nH]2)cc1\")",
    performance: [
      { metric: "RMSE (pKi)", value: "0.62" },
      { metric: "Pearson R²", value: "0.82" },
      { metric: "Pose Accuracy", value: "87.3%" }
    ]
  },
  {
    id: "antibody-designer",
    name: "Antibody-Designer",
    description: "Generate optimized antibody sequences with high binding affinity and specificity for target antigens.",
    modality: "Antibody",
    tags: ["Generative", "Affinity Maturation", "CDR Design"],
    downloads: 926,
    updatedAt: "3 weeks ago",
    isNew: true,
    detailedDescription: "Antibody-Designer is a generative AI model specifically designed for therapeutic antibody optimization. It can generate novel antibody sequences with improved binding affinity, specificity, and developability properties. The model was trained on a comprehensive dataset of antibody-antigen complexes with experimental binding and developability data.",
    inputExample: "{\n  \"antigen_sequence\": \"MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNPVLPFNDGVYFASTEKSNIIRGWIFGTTLDSKTQSLLIVNNATNVVIKVCEFQFCNDPFLGVYYHKNNKSWMESEFRVYSSANNCTFEYVSQPFLMDLEGKQGNFKNLREFVFKNIDGYFKIYSKHTPINLVRDLPQGFSALEPLVDLPIGINITRFQTLLALHRSYLTPGDSSSGWTAGAAAYYVGYLQPRTFLLKYNENGTITDAVDCALDPLSETKCTLKSFTVEKGIYQTSNFRVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISNCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNVYADSFVIRGDEVRQIAPGQTGKIADYNYKLPDDFTGCVIAWNSNNLDSKVGGNYNYLYRLFRKSNLKPFERDISTEIYQAGSTPCNGVEGFNCYFPLQSYGFQPTNGVGYQPYRVVVLSFELLHAPATVCGPKKSTNLVKNKCVNF\",\n  \"template_antibody\": \"path/to/template.pdb\"\n}",
    outputExample: "{\n  \"antibody_sequences\": [\n    {\n      \"heavy_chain\": \"EVQLVESGGGLVQPGGSLRLSCAASGFTFSSAWMSWVRQAPGKGLEWVANIKQDGSEKYYVDSVKGRFTISRDNAKNSLYLQMNSLRAEDTAVYYCARDGGHGFCSSASCFGPDYWGQGTLVTVSS\",\n      \"light_chain\": \"DIQMTQSPSSLSASVGDRVTITCRASQGISSALAWYQQKPGKAPKLLIYDASSLESGVPSRFSGSGSGTDFTLTISSLQPEDFATYYCQQFNSYPLTFGGGTKVEIK\",\n      \"predicted_affinity\": 0.2, // Kd in nM\n      \"developability_score\": 0.89\n    },\n    ...\n  ]\n}",
    usage: "from drugparadigm import AntibodyDesigner\n\nmodel = AntibodyDesigner.from_pretrained(\"drugparadigm/antibody-designer\")\ndesigns = model.generate(antigen_sequence=\"MFVFLVL...\", template_pdb=\"template.pdb\", num_designs=5)",
    performance: [
      { metric: "Binding Accuracy", value: "83.2%" },
      { metric: "Specificity Score", value: "0.78" },
      { metric: "Developability", value: "91.4%" }
    ]
  },
  {
    id: "rna-folder",
    name: "RNA-Folder",
    description: "Predict RNA secondary and tertiary structures for designing stable and effective RNA therapeutics.",
    modality: "RNA Therapeutic",
    tags: ["Structure Prediction", "Stability", "Design"],
    downloads: 742,
    updatedAt: "2 months ago",
    isNew: false,
    detailedDescription: "RNA-Folder is a deep learning model for RNA structure prediction and design. It can accurately predict the secondary and tertiary structure of RNA molecules, which is crucial for designing stable and effective RNA therapeutics like mRNA vaccines, siRNA, and antisense oligonucleotides. The model integrates thermodynamic principles with learned structural patterns from experimental data.",
    inputExample: "{\n  \"sequence\": \"GGAUCACCCGCGAAACAUCCUUGGAAGUGGACCG\",\n  \"constraints\": {\n    \"paired_positions\": [[1, 36], [2, 35]],\n    \"unpaired_positions\": [10, 11, 12]\n  }\n}",
    outputExample: "{\n  \"secondary_structure\": \"(((((...(((...)))...((((...))))..))))))\",\n  \"tertiary_structure\": \"path/to/output/structure.pdb\",\n  \"stability_score\": -23.4, // kcal/mol\n  \"confidence\": 0.92\n}",
    usage: "from drugparadigm import RNAFolder\n\nmodel = RNAFolder.from_pretrained(\"drugparadigm/rna-folder\")\nstructure = model.predict(sequence=\"GGAUCACCCGCGAAACAUCCUUGGAAGUGGACCG\")",
    performance: [
      { metric: "Base Pair Accuracy", value: "94.7%" },
      { metric: "RMSD (Tertiary)", value: "3.8Å" },
      { metric: "Energy Prediction", value: "0.89 R²" }
    ]
  },
  {
    id: "admet-predictor",
    name: "ADMET-Predictor",
    description: "Predict absorption, distribution, metabolism, excretion and toxicity properties of drug candidates with high accuracy.",
    modality: "Small Molecule",
    tags: ["ADMET", "Toxicity", "Pharmacokinetics"],
    downloads: 2876,
    updatedAt: "1 month ago",
    isNew: false,
    detailedDescription: "ADMET-Predictor is a comprehensive model for predicting pharmacokinetic and toxicity properties of small molecule drug candidates. It provides predictions for over 40 ADMET endpoints including solubility, permeability, protein binding, metabolic stability, CYP inhibition/induction, hERG inhibition, liver toxicity, and more. The model was trained on a large dataset of experimental ADMET measurements.",
    inputExample: "{\n  \"smiles\": \"COc1cc(N(C)CCN(C)C)c2nc(N)nc(N)c2c1OC\",\n  \"properties\": [\"logP\", \"Solubility\", \"hERG\", \"CYP3A4\"]\n}",
    outputExample: "{\n  \"predictions\": {\n    \"logP\": 3.24,\n    \"Solubility\": -4.32, // log(mol/L)\n    \"hERG\": 0.87, // probability of inhibition\n    \"CYP3A4\": 0.35, // probability of inhibition\n    \"confidence\": {\n      \"logP\": 0.95,\n      \"Solubility\": 0.89,\n      \"hERG\": 0.92,\n      \"CYP3A4\": 0.94\n    }\n  }\n}",
    usage: "from drugparadigm import ADMETPredictor\n\nmodel = ADMETPredictor.from_pretrained(\"drugparadigm/admet-predictor\")\nresults = model.predict(smiles=\"COc1cc(N(C)CCN(C)C)c2nc(N)nc(N)c2c1OC\")",
    performance: [
      { metric: "logP RMSE", value: "0.38" },
      { metric: "Solubility R²", value: "0.82" },
      { metric: "hERG AUC", value: "0.92" },
      { metric: "CYP AUC", value: "0.88" }
    ]
  },
  {
    id: "cell-selector",
    name: "Cell-Selector",
    description: "AI model for predicting optimal cell lines for gene and cell therapies based on genomic and transcriptomic profiles.",
    modality: "Cell & Gene Therapy",
    tags: ["Cell Line", "Expression", "Genomics"],
    downloads: 485,
    updatedAt: "1 month ago",
    isNew: false,
    detailedDescription: "Cell-Selector is a deep learning model designed to assist in cell and gene therapy development. It predicts the optimal cell lines for specific therapeutic applications based on genomic and transcriptomic profiles. The model can identify cells with high expression potential, minimal off-target effects, and favorable manufacturing characteristics.",
    inputExample: "{\n  \"transgene\": \"ATGGCCTCCTCCGAGGACGTCATCAAGGAGTTCATGCGCTTCAAGGTGCGCATGGAGGGCTCCGTGAACGGCCACGAGTTCGAGATCGAGGGCGAGGGCGAGGGCCGCCCCTACGAGGGCACCCAGACCGCCAAGCTGAAGGTGACCAAGGGCGGCCCCCTGCCCTTCGCCTGGGACATCCTGTCCCCCCAGTTCCAGTACGGCTCCAAGGTGTACGTGAAGCACCCCGCCGACATCCCCGACTACTTGAAGCTGTCCTTCCCCGAGGGCTTCAAGTGGGAGCGCGTGATGAACTTCGAGGACGGCGGCGTGGTGACCGTGACCCAGGACTCCTCCCTGCAGGACGGCTCCTTCATCTACAAGGTGAAGTTCATCGGCGTGAACTTCCCCTCCGACGGCCCCGTAATGCAGAAGAAGACTATGGGCTGGGAGGCCTCCACCGAGCGCCTGTACCCCCGCGACGGCGTGCTGAAGGGCGAGATCCACCAGGCCCTGAAGCTGAAGGACGGCGGCCACTACCTGGTGGAGTTCAAGTCCATCTACATGGCCAAGAAGCCCGTGCAGCTGCCCGGCTACTACTACGTGGACTCCAAGCTGGACATCACCTCCCACAACGAGGACTACACCATCGTGGAGCAGTACGAGCGCGCCGAGGGCCGCCACCACCTGTTCCTGTAGCGGCCGC\",\n  \"target_cells\": [\"T_CELLS\", \"NK_CELLS\", \"IPSC\"]\n}",
    outputExample: "{\n  \"rankings\": [\n    {\n      \"cell_type\": \"T_CELLS\",\n      \"score\": 0.92,\n      \"expression_level\": \"High\",\n      \"predicted_viability\": 0.87,\n      \"manufacturing_feasibility\": 0.85\n    },\n    {\n      \"cell_type\": \"NK_CELLS\",\n      \"score\": 0.76,\n      \"expression_level\": \"Medium\",\n      \"predicted_viability\": 0.82,\n      \"manufacturing_feasibility\": 0.64\n    },\n    {\n      \"cell_type\": \"IPSC\",\n      \"score\": 0.58,\n      \"expression_level\": \"Low\",\n      \"predicted_viability\": 0.91,\n      \"manufacturing_feasibility\": 0.45\n    }\n  ],\n  \"optimization_suggestions\": [\n    { \"cell_type\": \"T_CELLS\", \"suggestion\": \"Codon optimization for human T cells may improve expression by ~15%\" },\n    ...\n  ]\n}",
    usage: "from drugparadigm import CellSelector\n\nmodel = CellSelector.from_pretrained(\"drugparadigm/cell-selector\")\nresults = model.predict(transgene=\"ATGGCCTCCTCCGAGGACGTCAT...\", target_cells=[\"T_CELLS\", \"NK_CELLS\", \"IPSC\"])",
    performance: [
      { metric: "Expression Prediction", value: "0.84 R²" },
      { metric: "Cell Viability", value: "0.79 R²" },
      { metric: "Ranked Accuracy", value: "88.3%" }
    ]
  },
  {
    id: "deepprotac",
    name: "DeepProtac",
    description: "A deep learning-based predictor for PROTAC-induced protein degradation efficacy.",
    modality: "PROTAC",
    tags: ["Targeted Degradation", "Graph Neural Networks", "Drug Discovery"],
    downloads: 1120,
    updatedAt: "3 weeks ago",
    isNew: true,
    detailedDescription: "DeepProtac is a deep learning model designed to predict the degradation capacity of PROTAC molecules. It utilizes graph convolutional networks to process the structures of the target protein and E3 ligase, and a bidirectional LSTM to handle the SMILES representation of the linker. Trained on data from PROTAC-DB, DeepProtac achieves a prediction accuracy of approximately 78% and an AUC of 0.847.",
    inputExample: "{\n  \"protein_structure\": \"path/to/target_protein.pdb\",\n  \"e3_ligase_structure\": \"path/to/e3_ligase.pdb\",\n  \"linker_smiles\": \"CCOCCOCCO\"\n}",
    outputExample: "{\n  \"degradation_probability\": 0.78,\n  \"confidence_score\": 0.85\n}",
    usage: "from protac_models import DeepProtac\n\nmodel = DeepProtac()\nresult = model.predict(protein_structure='target.pdb', e3_ligase_structure='e3.pdb', linker_smiles='CCOCCOCCO')",
    performance: [
      { metric: "Prediction Accuracy", value: "77.95%" },
      { metric: "AUC", value: "0.847" }
    ]
  },
  {
    id: "diffprotac",
    name: "DiffProtac",
    description: "A diffusion model leveraging Transformers and GNNs for PROTAC linker generation.",
    modality: "PROTAC",
    tags: ["Linker Generation", "Diffusion Model", "Molecular Design"],
    downloads: 980,
    updatedAt: "1 month ago",
    isNew: true,
    detailedDescription: "DiffProtac employs a diffusion model augmented with an O(3) equivariant graph Transformer to generate novel PROTAC linkers. By integrating Transformers for node feature updates and GNNs for coordinate updates, it ensures rotational equivariance in molecular generation. The model achieves a 93.86% validity rate in generating PROTAC structures.",
    inputExample: "{\n  \"warhead_smiles\": \"CC(C)CC1=CC=C(C=C1)C(C)C\",\n  \"e3_ligand_smiles\": \"CCOC(=O)C1=CC=CC=C1\"\n}",
    outputExample: "{\n  \"generated_linker_smiles\": \"CCOCCOCCO\",\n  \"validity_score\": 0.94\n}",
    usage: "from protac_models import DiffProtac\n\nmodel = DiffProtac()\nlinker = model.generate_linker(warhead_smiles='CC(C)CC1=CC=C(C=C1)C(C)C', e3_ligand_smiles='CCOC(=O)C1=CC=CC=C1')",
    performance: [
      { metric: "Validity Rate", value: "93.86%" },
      { metric: "Uniqueness", value: "89.5%" }
    ]
  }
  
];

export const getModelById = (id: string): Model | undefined => {
  return models.find(model => model.id === id);
};

export const getModelsByModality = (modality: string): Model[] => {
  return models.filter(model => model.modality === modality);
};

export const getFeaturedModels = (count: number = 3): Model[] => {
  // Sort by downloads and return top N
  return [...models].sort((a, b) => b.downloads - a.downloads).slice(0, count);
};

export const getNewestModels = (count: number = 3): Model[] => {
  return models.filter(model => model.isNew).slice(0, count);
};

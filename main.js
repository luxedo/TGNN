const SIZE = 16;
const INPUT_PLAYER = 8;
const SCALE = 25;
const TICK = 200;
const OUTPUT_SHAPE = SIZE * SIZE;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let nextTick, frame, model, playerInput;
let mode = 'train';
const menuScreen = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const gameOverScreen = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const blankScreen = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

async function run() {
  canvas.width = SCALE * SIZE;
  canvas.height = SCALE * SIZE;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  document.getElementsByClassName('game')[0].appendChild(canvas);
  model = createModel();
  if (mode === 'train') {
    const learningRate = 5;
    const optimizer = tf.train.sgd(learningRate);
    const loss = tf.losses.huberLoss;
    const metrics = [tf.metrics.binaryAccuracy];
    model.compile({
      optimizer,
      loss,
      metrics,
    });
  }
  frame = tf.zeros([1, 1, OUTPUT_SHAPE]).arraySync();
  state = tf.zeros([1, 1, 128]);
  playerInput = tf.zeros([INPUT_PLAYER]).arraySync();
  playerInput[0] = 1;
  setInterval(() => {
    playerInput[0] = playerInput[0] == 0 ? 1 : 0;
  }, 1000);
  nextTick = Date.now() + TICK;
  mainloop();
}

function mainloop() {
  if (nextTick <= Date.now()) {
    nextTick = Date.now() + TICK;
    updateAndDraw();
  }
  requestAnimationFrame(mainloop);
}

function updateAndDraw() {
  if (mode === 'nn' || mode == 'train') {
    const inputGameTensor = tf.tensor(frame);
    const inputPlayerTensor = tf
      .tensor(playerInput)
      .reshape([1, 1, INPUT_PLAYER]);
    const input = [inputGameTensor, inputPlayerTensor];
    const output = model.predict(input);
    frame = output.reshape([1, 1, OUTPUT_SHAPE]).arraySync();
    const display = output.reshape([SIZE, SIZE]).arraySync();
    viewOutput(display);
    if (mode === 'train') {
      const screen = playerInput[0] == 1 ? gameOverScreen : menuScreen;
      const output = tf.tensor(screen).reshape([1, OUTPUT_SHAPE]);
      model.fit(input, output, {batchSize: 1, shuffle: false}).then(history => {
        console.log(history);
      });
    }
  }
}

function createModel() {
  const inputGame = tf.input({
    batchShape: [1, 1, OUTPUT_SHAPE],
    name: 'inputGame',
  });
  const inputPlayer = tf.input({
    batchShape: [1, 1, INPUT_PLAYER],
    name: 'inputPlayer',
  });
  const input = tf.layers
    .concatenate({name: 'concatenate'})
    .apply([inputGame, inputPlayer]);
  const rnn = tf.layers.simpleRNN({
    units: 128,
    activation: 'sigmoid',
    kernelInitializer: 'glorotNormal',
    biasInitializer: 'glorotNormal',
    reccurentInitializer: 'glorotNormal',
    name: 'rnn',
    stateful: true,
  });
  const dense = tf.layers.dense({
    units: OUTPUT_SHAPE,
    activation: 'sigmoid',
    kernelInitializer: 'glorotNormal',
    biasInitializer: 'glorotNormal',
    name: 'dense',
  });
  const output = dense.apply(rnn.apply(input));
  const model = tf.model({
    inputs: [inputGame, inputPlayer],
    outputs: output,
  });
  const surface = {name: 'Model Summary', tab: 'Model Inspection'};
  tfvis.show.modelSummary(surface, model);
  return model;
}

function viewOutput(display) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'lightGray';
  display.forEach((row, i) => {
    row.forEach((pixel, j) => {
      if (pixel > 0.5) {
        ctx.fillRect(j * SCALE, i * SCALE, SCALE, SCALE);
      }
    });
  });
  for (let i = 1; i < SIZE; i++) {
    ctx.moveTo(0, i * SCALE);
    ctx.lineTo(SIZE * SCALE, i * SCALE);
    ctx.moveTo(i * SCALE, 0);
    ctx.lineTo(i * SCALE, SIZE * SCALE);
  }
  ctx.stroke();
}

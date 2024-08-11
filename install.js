module.exports = {
  "cmds": {
    "nvidia": "pip install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118",
    "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6",
    "default": "pip install torch torchvision torchaudio"
  },
  "requires": [{
    "type": "conda",
    "name": "ffmpeg",
    "args": "-c conda-forge"
  }],
  "run": [{
    "method": "shell.run",
    "params": {
      "venv": "env",
      "message": "git clone https://huggingface.co/spaces/cocktailpeanut/OpenVoice app",
    }
  }, {
    "method": "shell.run",
    "params": {
      "path": "app",
      "venv": "env",
      "message": [
        "pip install -r requirements_locally.txt",
        "{{(gpu === 'nvidia' ? self.cmds.nvidia : (gpu === 'amd' ? self.cmds.amd : self.cmds.default))}}"
      ]
    }
  }, {
    "method": "fs.download",
    "params": {
      "uri": "https://myshell-public-repo-host.s3.amazonaws.com/openvoice/checkpoints_1226.zip"
      "path": "app/ckpt.zip"
    }
  }, {
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}

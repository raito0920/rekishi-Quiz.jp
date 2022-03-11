'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const quizSet = shuffle([
    {q: '源平合戦の最初の戦いと言われ、平家打倒を掲げて挙兵した人物の組み合わせはどれか？', c: ['以仁王と源頼政', '後鳥羽上皇と藤原定家', '以仁王と木曽義仲']},
    {q: '長篠の戦いで織田・徳川連合軍に敗れた人物は誰か?', c: ['武田勝頼', '武田信玄', '上杉謙信']},
    {q: '屋島の戦いで船上の扇を打ち落とした人物は誰でしょうか', c: ['那須与一', '北条時政', '源義経']},
    {q: '祇園精舎の鐘の声という一文から始まる物語の名前は？', c: ['平家物語', '更級日記', '曽我物語']},
    {q: '敵に塩を送るという言葉の由来となった人物は誰？', c: ['上杉謙信', '今川義元', '伊達政宗']},
    {q: '明智光秀の家紋は桔梗ですが明智の一族の子孫の一人で薩摩藩と長州藩に同盟させた人物は誰？', c: ['坂本龍馬', '坂本龍一', '雪斎']},
    {q: '平清盛が信仰していたとされている。現在広島県の世界遺産の名前は？', c: ['厳島神社', '伊勢神宮', '東大寺']},
    {q: '「生まれながら将軍である」と言った徳川三代将軍は誰？', c: ['徳川家光', '徳川慶喜', '徳川家茂']},
    {q: '五稜郭の戦いに参戦した元新撰組副隊長の名前は誰？', c: ['土方歳三', '近藤勇', '岩崎弥太郎']},
    {q: '金閣寺を建てた将軍の名前は？', c: ['足利義満', '足利尊氏', '足利義政']},
    {q: '桶狭間の戦いの際に織田信長が戦勝祈願として訪れた場所は？', c: ['熱田神宮', '比叡山', '高野山']},
    {q: '織田信長によって追放された最後の足利将軍の名前は？', c: ['足利義昭', '足利義教', '足利義輝']},
    {q: '実在した人物で流浪の剣心にも出でくる牙突を使うのは誰？', c: ['斎藤一', '塚原卜伝', '藤原竜也']},
    {q: 'お市の三人娘と知られているのは初、茶々、あと一人は誰？', c: ['江', 'ねね', '松']},
    {q: '「人は城・人は石垣・人は堀...で続く名言を残した戦国大名は？', c: ['武田信玄', '浅井長政', '大友宗麟']},
    {q: 'いつまでも結果や結論が出てこないことを意味しているのを、何評定というか？', c: ['小田原', '岡崎', '津軽']},
    {q: '信長の後継者を決める会議で秀吉や柴田勝家が中心となって行われた会議の名前は？', c: ['清須', '駿河', '江戸']},
    {q: 'お市の方の夫で信長の義弟であるにも関わらず、最終的に信長を裏切ってしまった戦国大名は？', c: ['浅井長政', '徳川家康', '明智光秀']},
    {q: '一ノ谷の戦いで義経が奇襲をかけた際にある動物を見て断崖絶壁の谷を駆け降りましたその動物とは？', c: ['鹿', '象', '牛']},
    {q: '秀吉の軍師と知られている人物で信長の弔い合戦をするべきと進言した人物は誰？', c: ['黒田官兵衛', '竹中半兵衛', '本田政信']},
    {q: '徳川軍を二度も負けさせた現在の長野県や群馬県の一部の地域治めていた戦国大名の名前は？', c: ['真田昌幸', '真田幸村', '武田信玄']},
    {q: '三本の矢という言葉の逸話がある。中国地方を統治していた戦国大名の名前は?', c: ['毛利元就', '毛利輝元', '伊達政宗']},   
    {q: '日本の歴史上の人物にはそれぞれあだ名が付けられていました、狸は家康、大天狗は後白河法皇、はげねずみは秀吉。ではきんかん頭と呼ばれていた人物名は？', c: ['明智光秀', '武田信玄','西郷隆盛']},
    ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    
    if (currentNum === quizSet.length - 1) {
       scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
       result.classList.remove('hidden')
      } else {
      currentNum++;
      setQuiz();
    }
  });
}

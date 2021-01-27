export default {
  data: [
    {
      id: "3f8a198c-60a2-11eb-8932-9b95cd7afc2d",
      title: '开篇词：Serverless 大热，程序员面临的新机遇与挑战',
      content: '可能你会认为 Serverless 是最近两年兴起的技术，实际上，Serverless 概念从 2012 年就提出来了，随后 AWS 在 2014 年推出了第一款 Serverless 产品 Lambda，开启了 Serverless 元年。此后国外 Serverless 生态迅速发展，诞生了如 Serverless Framework、Vercel 等很多优秀的产品。',
      date: '2020-12-23'
    },
    {
      id: "5158b100-5fee-11eb-9afa-9b5f85523067",
      title: '基础入门：编写你的第一个 Serverless 应用',
      content: '学习一门新技术，除了了解其基础概念，更重要的是把理论转化为实践，所以学会开发 Serverless 应用尤为重要。考虑到很多刚开始接触 Serverless 开发的同学在短时间很难适应 Serverless 的开发思想，知识也不够体系化，所以我除了带你实现一个 Serverless 应用之外，还会介绍应用开发时涉及的重要知识点，让你更深刻地理解 Serverless，建立属于自己的知识体系。',
      date: '2020-12-29'
    },
    {
      id: "574963de-5fee-11eb-85ff-ef14398fc721",
      title: '运行原理： Serverless 应用是怎么运行的？',
      content: '前段时间，团队有个同学在用 Serverless 实时处理日志时遇到了一个问题：每次处理结果都是相同的。后来问过我之后才发现是由于函数执行过程可能存在执行上下文重用，导致每次拉取到的都是同一份数据。归根究底是因为他对 Serverless 应用的运行原理理解得不够深入，而这也是很多刚开始学 Serverless 的同学经常遇到的共性问题，所以我准备了这节课，希望能让你有所收获。',
      date: '2020-12-31'
    },
    {
      id: "5c27d4bc-5fee-11eb-a938-bbd9ca583d25",
      title: '开发框架：如何提高应用开发调试和部署效率？',
      content: '到目前为止，你已经知道怎么基于 FaaS 开发 Serverless 应用了。不过你应该可以发现，04讲中的应用很简单（只有一个函数）。而实际情况中，绝大部分应用都是由多个函数组成的，应用部署时需要将所有函数一同部署，并且函数运行依赖 FaaS 环境，这就导致函数代码不能直接在本地运行。这些限制就给我们的应用开发、调试和部署流程带来了挑战。',
      date: '2021-01-05'
    },
    // {
    //   id: "608bf83a-5fee-11eb-b6b0-8f3bba8e82d5",
    //   title: '依赖管理：Serverless 应用怎么安装依赖？',
    //   content: '我们的 Serverless 应用代码都是独立的函数，不涉及其他依赖（在 Serverless 应用中，依赖可以分为两种：通过具体编程语言的包管理工具，如 npm、pip 等安装的包；通过 apt 等工具安装的程序运行时需要的软件包）。而在实际进行应用开发时，大部分情况下都会有第三方依赖。比如你要用 Node.js 操作 MySQL 时，肯定要用到操作数据库的依赖包（如 node-mysql2），然后你很快就写出如下的函数代码',
    //   date: '2021-01-05'
    // },
    // {
    //   id: "644ae56c-5fee-11eb-afe6-139684e4ed2b",
    //   title: '运行时：使用自定义运行时支持自定义编程语言',
    //   content: '我们知道 Serverless 应用的函数代码是在 FaaS 中运行的，到目前为止，你也只能选择 FaaS 平台支持的编程语言开发应用，而 FaaS 平台支持的编程语言不但有限，还只支持极少数的特定版本，比如函数计算只支持 Node.js 12、Node.js 8、Java、Python 等 。这样一来，当你想用 FaaS 平台不支持的编程语言（比如 TypeScrip、Golang、Ruby ）或各种编程语言的小版本（比如最新的 Node.js）时，该怎么办呢？这就需要使用自定义运行时了。',
    //   date: '2021-01-05'
    // }
  ]
}

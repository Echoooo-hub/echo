import React, { useState } from 'react';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.content) {
      const newMessage = {
        id: messages.length + 1,
        name: formData.name,
        content: formData.content,
        time: new Date().toLocaleString('zh-CN'),
      };
      setMessages(prev => [newMessage, ...prev]);
      setFormData({ name: '', content: '' });
    }
  };

  return (
    <section className="message-board">
      <div className="container">
        <h2 className="section-title">留言板</h2>
        <form className="message-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">留言内容</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">提交留言</button>
        </form>
        <div className="messages-list">
          {messages.length === 0 ? (
            <p className="messages-empty">暂无留言</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="message-item">
                <h4>{message.name}</h4>
                <p>{message.content}</p>
                <div className="message-time">{message.time}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageBoard;
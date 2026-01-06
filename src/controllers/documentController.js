import Document from "../models/Document.js";

/**
 * CREATE DOCUMENT
 */
export const createDocument = async (req, res) => {
  try {
    const { title, content, projectId } = req.body;

    const doc = await Document.create({
      title,
      content,
      projectId,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Document created", document: doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET SINGLE DOCUMENT
 */
export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL DOCUMENTS (optional)
 */
export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE DOCUMENT (with version control)
 */
export const updateDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Save current content to versions array
    doc.versions.push({
      content: doc.content,
      editedBy: req.user.id,
      editedAt: new Date(),
    });

    // Update with new content
    doc.title = req.body.title || doc.title;
    doc.content = req.body.content || doc.content;

    await doc.save();
    res.json({ message: "Document updated", document: doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE DOCUMENT
 */
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET DOCUMENT VERSIONS
 */
export const getDocumentVersions = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json(doc.versions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
